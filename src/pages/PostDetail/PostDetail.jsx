import { useNavigate, useParams } from "react-router-dom"
import { useContext } from "react"

import { PostContext } from "../../main"
import { PostCard } from "../../components/MainSection/PostCard/PostCard"

import "./PostDetail.css"
import { Menu } from "../../components/MainSection/Menu/Menu"
import { MenuBar } from "../../components/MenuBar/MenuBar"
import { RightSideBar } from "../../components/MainSection/RightSideBar/RightSideBar"

export const PostDetail = () => {
  const { postState } = useContext(PostContext)
  const { postId } = useParams()
  const navigate = useNavigate()

  const foundPost = postState?.posts?.find(({id}) => id === postId)
  
  return (
    <div className="detail-main">
      <div className="detail-menu">
        <Menu />
      </div>
      <div className="detail-container" >
        <div className="scroll-test">
        <p><span className="detail-back-btn" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></span> Posts</p>
          <PostCard {...foundPost} />
        </div>
        <div className="detail-right-bar">
          <RightSideBar />
        </div>      
        <MenuBar />
      </div>
    </div>
    // <div>
    //   <Menu/>
    //   <div className="detail-container">
    //     <div>
    //       <p><span className="detail-back-btn" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></span> Posts</p>
    //       <PostCard {...foundPost} />
    //     </div>
    //     <div></div>
    //   </div>
    // </div>
  )
}