import { useContext } from "react"
import "./CommentPost.css"
import { NotificationContext, PostContext, UserContext } from "../../../../main"
import { createNewComment, editPostAction, postFailureAction, postLoadingAction } from "../../../../actions/postActions"
import { createPostCommentService } from "../../../../services/postService"

export const CommentPost = ({post}) => {
  const { userState } = useContext(UserContext)
  const {postState, postDispatch} = useContext(PostContext)
  const { showNotification } = useContext(NotificationContext)

  const handleCommentPost = async (event) => {
    if(postState.isLoading){
      showNotification("Some work is going on.", "info")
      return 
    }
    const commentData = {
      content: postState?.newComment,
      commentUser: userState?.user?.username,
      commentImage: userState?.user?.profileImg
    }
    postDispatch(postLoadingAction())
    try {
      const result = await createPostCommentService(post.id, commentData)
      postDispatch(editPostAction(result.data))
      postDispatch(createNewComment(""))
    }catch(error){
      postDispatch(postFailureAction(error))
      console.log(error)
    }
  }

  return (
    <div className="comment-post-container">
      <input onChange={(event) => postDispatch(createNewComment(event.target.value))} value={postState?.newComment} className="comment-post-input" placeholder="Write your comment" />
      <button onClick={handleCommentPost} className="comment-post-btn">Post</button>
    </div>
  )
}