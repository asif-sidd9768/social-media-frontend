import { useContext } from "react"

import { MainSection } from "../../components/MainSection/MainSection"
import { Menu } from "../../components/MainSection/Menu/Menu"
import { RightSideBar } from "../../components/MainSection/RightSideBar/RightSideBar"
import { MenuBar } from "../../components/MenuBar/MenuBar"
import { PostAdd } from "../../components/PostAdd/PostAdd"
import { SideMenu } from "../../components/SideMenu/SideMenu"
import { PostContext, UserContext } from "../../main"
import { SearchList } from "../../components/SearchList/SearchList"

import "./Homepage.css"

export const Homepage = () => {
  const { userState } = useContext(UserContext)
  const { postState } = useContext(PostContext)
  
  return (
    <div className="homepage-main-container main-app-container">
      <div className="main-app-sidemenu">
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