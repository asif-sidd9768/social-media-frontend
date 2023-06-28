import { useNavigate, useParams } from "react-router-dom"
import { useContext } from "react"

import { PostContext } from "../../main"
import { PostCard } from "../../components/MainSection/PostCard/PostCard"

import "./PostDetail.css"

export const PostDetail = () => {
  const { postState } = useContext(PostContext)
  const { postId } = useParams()
  const navigate = useNavigate()

  const foundPost = postState?.posts?.find(({id}) => id === postId)
  
  return (
    <div className="detail-container">
      <div>
        <p><span className="detai-back-btn" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></span> Posts</p>
        <PostCard {...foundPost} />
      </div>
      <div></div>
    </div>
  )
}