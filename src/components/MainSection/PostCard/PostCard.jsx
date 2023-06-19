import { useContext, useState } from "react"
import "./PostCard.css"
import { calculateTimeDiff } from "../../../utils/calculateTimeDiff"
import { bookmarkPostService, postLikeService } from "../../../services/postService"
import { PostContext } from "../../../contexts/PostContext"
import { setPostAction } from "../../../actions/postActions"
import { checkLikedPost } from "../../../utils/checkLikedPost"
import { UserContext } from "../../../contexts/UserContext"
import { postBookmarkAction } from "../../../actions/userActions"
import { checkBookmarkPost } from "../../../utils/checkBookmarkPost"

export const PostCard = (post) => {
  const {postDispatch} = useContext(PostContext)
  const { userState, userDispatch } = useContext(UserContext)
  const [commentShow, setCommentShow] = useState(false)

  const isLikedByUser = checkLikedPost(post)
  const isBookmarkByUser = checkBookmarkPost(post, userState?.user?.bookmarks)
  const handlePostLike = async () => {
    try {
      const {status, data} = await postLikeService(post._id)
      if(status === 201){
        postDispatch(setPostAction(data.posts))
      }
    }catch(error){
      console.log(error)
    }
  }

  const handlePostBookmark = async () => {
    try{
      const {status, data} = await bookmarkPostService(post._id)
      if(status === 200){
        userDispatch(postBookmarkAction(data.bookmarks))
      }
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
          <span onClick={handlePostBookmark} className={`${isBookmarkByUser ? "post-card-liked" : ""}`}>
            <i className="fa-solid fa-bookmark"></i>
          </span>
          <span>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </span>
        </div>
      </div>
      <div className="post-card-content">
        <p>{post?.content?.slice(0,150)}...</p>
      </div>
      <div className="post-card-bottom-btns">
        <span onClick={handlePostLike} className={`${isLikedByUser ? "post-card-liked" : ""}`}>
          <i className="fa-solid fa-thumbs-up"></i> {checkLikedPost(post) ? "Liked Post" : "Like Post"}  
          <strong className="post-card-like-count">{post?.likes?.likeCount}</strong>
        </span>
        <span className={`${commentShow ? "post-card-comment-btn" :""}`} onClick={() => setCommentShow(prevState => !prevState)}>
          <i className="fa-solid fa-message"></i> Comment
        </span>
        <span>
          <i className="fa-solid fa-share-from-square"></i> Share
        </span>
      </div>
      {
        commentShow && <>
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