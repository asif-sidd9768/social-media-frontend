import { useContext } from "react"
import "./CommentPost.css"
import { PostContext, UserContext } from "../../../../main"
import { createNewComment, editPostAction } from "../../../../actions/postActions"
import { createPostCommentService } from "../../../../services/postService"

export const CommentPost = ({post}) => {
  const { userState } = useContext(UserContext)
  const {postState, postDispatch} = useContext(PostContext)

  const handleCommentPost = async (event) => {
    const commentData = {
      content: postState?.newComment,
      commentUser: userState?.user?.username,
      commentImage: userState?.user?.profileImg
    }
    try {
      const result = await createPostCommentService(post.id, commentData)
      postDispatch(editPostAction(result.data))
    }catch(error){
      console.log(error)
    }finally {
      postDispatch(createNewComment(""))
    }
  }

  return (
    <div className="comment-post-container">
      <input onChange={(event) => postDispatch(createNewComment(event.target.value))} className="comment-post-input" placeholder="Write your comment" />
      <button onClick={handleCommentPost} className="comment-post-btn">Post</button>
    </div>
  )
}