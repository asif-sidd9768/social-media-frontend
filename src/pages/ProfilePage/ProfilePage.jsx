import { Menu } from "../../components/MainSection/Menu/Menu"
import { RightSideBar } from "../../components/MainSection/RightSideBar/RightSideBar"
import { ProfileSection } from "../../components/ProfileSection/ProfileSection"
import { SideMenuProfile } from "../../components/SideMenuProfile/SideMenuProfile"
import "./ProfilePage.css"

export const ProfilePage = () => {
  return (
    <div className="profile-main-container main-app-container">
      <div className="main-app-sidemenu">
        <SideMenuProfile />
      </div>
      <div className="app-main-section">
        <div>
          <div className="profile-menu">
            <Menu />
          </div>
          <div className="profile-container" >
            <ProfileSection />
            <div className="profile-right-bar">
              <RightSideBar />
            </div>      
          </div>
        </div>
      </div>
    </div>
  )
  }

{/* <div className="homepage-main-container main-app-container">
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
    </div> */}
  // )
// }