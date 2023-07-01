import { useContext, useEffect, useRef, useState } from "react"
import "./PostCard.css"
import { calculateTimeDiff } from "../../../utils/calculateTimeDiff"
import { bookmarkPostService, deletePostService, editPostService, postDislikeService, postLikeService, removeBookmarkPostService } from "../../../services/postService"
import { PostContext } from "../../../contexts/PostContext"
import { deletePostAction, dislikePostAction, editPostAction, setPostAction } from "../../../actions/postActions"
import { checkLikedPost } from "../../../utils/checkLikedPost"
import { UserContext } from "../../../contexts/UserContext"
import { postBookmarkAction, togglePostEditingAction } from "../../../actions/userActions"
import { checkBookmarkPost } from "../../../utils/checkBookmarkPost"
import { NavLink, useLocation } from "react-router-dom"

export const PostCard = (post) => {
  const {postDispatch, handlePostLike} = useContext(PostContext)
  const [showEditBtn, setShowEditBtn] = useState(false)
  const { userState, userDispatch, handlePostBookmark } = useContext(UserContext)
  const controlBtnRef = useRef(null);
  const fileInputRef = useRef(null)
  const location = useLocation()

  const isLikedByUser = checkLikedPost(post, userState?.user?.id)
  const isBookmarkByUser = checkBookmarkPost(post, userState?.user?.bookmarks)

  // const handlePostLike = async () => {
  //   try {
  //     if (isLikedByUser) {
  //       const { status, data } = await postDislikeService(post.id);
  //       console.log(data)
  //       if (status === 200) {
  //         postDispatch(dislikePostAction(data));
  //       }
  //     } else {
  //       const { status, data } = await postLikeService(post.id);
  //       if (status === 200) {
  //         postDispatch(setPostAction(data));
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handlePostBookmark = async () => {
  //   try {
  //     if (isBookmarkByUser) {
  //       // If the post is already bookmarked, call the removeBookmarkService or API endpoint
  //       const { status, data } = await removeBookmarkPostService(post.id);
  //       if (status === 200) {
  //         userDispatch(postBookmarkAction(data.bookmarks));
  //       }
  //     } else {
  //       // If the post is not bookmarked, call the addBookmarkService or API endpoint
  //       const { status, data } = await bookmarkPostService(post.id);
  //       if (status === 200) {
  //         userDispatch(postBookmarkAction(data.bookmarks));
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (controlBtnRef.current && !controlBtnRef.current.contains(event.target)) {
        setShowEditBtn(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const togglePostEdit = () => {
    toggleControlBtn()
    userDispatch(togglePostEditingAction())
  }

  const toggleControlBtn = () => {
    setShowEditBtn(!showEditBtn)
  }

  const handlePostEdit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    if(event.target[1].files[0]){
      formData.append("editedImage", event.target[1].files[0])
    }
    formData.append("content", event.target[0].value)
    try{
      const result = await editPostService(formData, post.id)
      postDispatch(editPostAction(result.data))
      togglePostEdit()
      setShowEditBtn(false)
    }catch(error){
      console.log(error)
    }
  }

  const handlePostDelete = async () => {
    toggleControlBtn()
    try {
      const {status} = await deletePostService(post.id)
      if(status === 200){
        postDispatch(deletePostAction(post.id))
      }
      toggleControlBtn()
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="post-card-container">
      <div className="post-card-header">
        <div className="post-card-user">
          <span className="post-card-profile">
            <i className="fa-solid fa-circle-user"></i>
          </span>
          <span className="post-card-header-text">
            <p>{post?.username}</p>
            <p className="post-card-time">{calculateTimeDiff(post?.createdAt)}</p>
          </span>
        </div>
        <div className="post-card-header-btns">
          <span onClick={() => handlePostBookmark(isBookmarkByUser, post.id)} className={`${isBookmarkByUser ? "post-card-liked" : ""}`}>
            <i className="fa-solid fa-bookmark"></i>
          </span>
          <span ref={controlBtnRef} className="post-control-btn">
            <i onClick={toggleControlBtn} className="fa-solid fa-ellipsis-vertical"></i>
            {showEditBtn && <div className="post-btns">
              <button onClick={togglePostEdit}>Edit</button>
              <button onClick={handlePostDelete}>Delete</button>
            </div>}
          </span>
        </div>
      </div>
      {post.image && <div className="post-card-img-container">
        <img src={post.image} className="post-card-img" onClick={() => fileInputRef.current.click()} />
      </div>}
      {post.video && <div className="post-card-img-container">
        <video src={post.video} className="post-card-img" muted autoPlay={true} loop/>
      </div>}
      <div className="post-card-content">
        <form onSubmit={handlePostEdit}>
          {userState?.isPostEditing ? <textarea rows={3}  type="text" className="post-is-editing" defaultValue={`${post?.content}`} /> : <NavLink className={`${location.pathname.includes("post") ? "post-card-content" : "post-card-content-no-pad"}`} to={`/post/${post?.id}`}>
            {location.pathname.includes("post") && <p>{post?.content}</p>}
            {!location.pathname.includes("post") && <p>{post?.content?.length < 150 ? post?.content?.slice(0,150) : `${post?.content?.slice(0,150)}...`}</p>}
          </NavLink>}
          {
            userState?.isPostEditing && <input
            type="file"
            accept="image/*,  video/*"
            className="file-input"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
          />
          }
          {/* <textarea/><p>{post?.content?.slice(0,150)}...</p> */}
          {userState?.isPostEditing && <div className="post-card-edit-save">
            <button>Save</button>
          </div>}
        </form>
      </div>
      <div className="post-card-bottom-btns">
        <span onClick={() => handlePostLike(isLikedByUser, post.id)} className={`${isLikedByUser ? "post-card-liked" : ""}`}>
          <i className="fa-solid fa-thumbs-up"></i> {checkLikedPost(post) ? "Liked Post" : "Like Post"}  
          <strong className="post-card-like-count">{post?.likes?.likeCount}</strong>
        </span>
        <span className={`post-card-comment-btn`} onClick={() => setCommentShow(prevState => !prevState)}>
          <i className="fa-solid fa-message"></i> Comment
        </span>
        <span>
          <i className="fa-solid fa-share-from-square"></i> Share
        </span>
      </div>
      {
        location.pathname.includes("post") && <>
          <div className="post-card-comments-container">
            <div className="post-card-comment">
              <span className="comment-profile">
                <i className="fa-solid fa-circle-user"></i>
              </span>
              <span className="comment-text-container">
                <span className="comment-username">Jack P:</span>
                <span className="comment-text"> well done jackob majc is the workds person to be not here so be bo isnt' it is greatest of all.</span>
              </span>
            </div>
            <div className="post-card-comment">
              <span className="comment-profile">
                <i className="fa-solid fa-circle-user"></i>
              </span>
              <span className="comment-text-container">
                <span className="comment-username">Jack P:</span>
                <span className="comment-text"> well done jackob majc is the workds person to be not here so be bo isnt' it is greatest of all.</span>
              </span>
            </div>
          </div>
        </>
      }
    </div>
  )
}