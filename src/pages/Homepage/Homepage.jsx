import { useContext, useEffect, useRef } from "react"
import { MainSection } from "../../components/MainSection/MainSection"
import { Menu } from "../../components/MainSection/Menu/Menu"
import { RightSideBar } from "../../components/MainSection/RightSideBar/RightSideBar"
import { MenuBar } from "../../components/MenuBar/MenuBar"
import { PostAdd } from "../../components/PostAdd/PostAdd"
import { SideMenu } from "../../components/SideMenu/SideMenu"

import "./Homepage.css"
import { PostContext } from "../../main"
import { addNewPostAction } from "../../actions/postActions"

export const Homepage = () => {
  const { postState } = useContext(PostContext)
  
  return (
    <div className="homepage-main">
      <div className="homepage-menu">
        <Menu />
      </div>
      <div className="homepage-container" >
        <div className="scroll-test">
          <MainSection />
        </div>
        <div className="homepage-right-bar">
          <RightSideBar />
        </div>      
        <MenuBar />
        {postState?.addingPost && <PostAdd  />}
      </div>
    </div>
  )
}

{/* <div className="homepage-main">
      <div>
        <Menu />
      </div>
      <div className="homepage-container" >
        <div className="scroll-test">
          <MainSection />
        </div>
        <div className="homepage-right-bar">
          <RightSideBar />
        </div>      
        <MenuBar />
      </div>
    </div> */}