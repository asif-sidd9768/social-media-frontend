import { MainSection } from "../../components/MainSection/MainSection"
import { Menu } from "../../components/MainSection/Menu/Menu"
import { RightSideBar } from "../../components/MainSection/RightSideBar/RightSideBar"
import { ProfileSection } from "../../components/ProfileSection/ProfileSection"
import { SideMenu } from "../../components/SideMenu/SideMenu"
import { SideMenuProfile } from "../../components/SideMenuProfile/SideMenuProfile"
import "./ProfilePage.css"

export const ProfilePage = () => {
  return (
    <div>
      <Menu />
      <div className="profile-container" >
        <ProfileSection />
        <div className="profile-right-bar">
          <RightSideBar />
        </div>      
      </div>
    </div>
  )
}