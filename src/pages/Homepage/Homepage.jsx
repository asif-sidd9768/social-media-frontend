import { useContext, useEffect, useRef } from "react"
import { MainSection } from "../../components/MainSection/MainSection"
import { Menu } from "../../components/MainSection/Menu/Menu"
import { RightSideBar } from "../../components/MainSection/RightSideBar/RightSideBar"
import { MenuBar } from "../../components/MenuBar/MenuBar"
import { PostAdd } from "../../components/PostAdd/PostAdd"
import { SideMenu } from "../../components/SideMenu/SideMenu"

import "./Homepage.css"
import { PostContext, UserContext } from "../../main"
import { addNewPostAction } from "../../actions/postActions"
import { SearchList } from "../../components/SearchList/SearchList"

export const Homepage = () => {
  const { userState } = useContext(UserContext)
  const { postState } = useContext(PostContext)
  
  return (
    <div className="homepage-main-container main-app-container">
      <div>
        <SideMenu/>
      </div>
      <div className="app-main-section">
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
          {userState?.mobileSearch && <div className="search-popup-mobile">
            <SearchList />
            </div>}
          </div>
        </div>
    </div>
      
  )
}


{/* <div className="main-app-container">
      <SideMenu />
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
        {userState?.mobileSearch && <div className="search-popup-mobile">
          <SearchList />
        </div>}
      </div>
    </div> */}

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