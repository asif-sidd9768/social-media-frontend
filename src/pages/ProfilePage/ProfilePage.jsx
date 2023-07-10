import { useContext, useEffect } from "react"
import { Menu } from "../../components/MainSection/Menu/Menu"
import { RightSideBar } from "../../components/MainSection/RightSideBar/RightSideBar"
import { ProfileSection } from "../../components/ProfileSection/ProfileSection"
import { SideMenuProfile } from "../../components/SideMenuProfile/SideMenuProfile"
import "./ProfilePage.css"
import { UserContext } from "../../main"
import { setProfileUserAction, userStateFailureAction, userStateLoadingAction } from "../../actions/userActions"
import { getUserService } from "../../services/userService"
import { useParams } from "react-router-dom"

export const ProfilePage = () => {
  const {userState, userDispatch} = useContext(UserContext)
  const { username } = useParams()
  const profileData = userState?.profileUser?.username === userState?.user?.username ? userState?.user : userState?.profileUser
  
  useEffect(() => {
    async function loadUser (){
      userDispatch(userStateLoadingAction())
      try{
        const result = await getUserService(username)
        userDispatch(setProfileUserAction(result.data))
      }catch(error){
        console.log(error)
        userDispatch(userStateFailureAction(error))
      }
    }
    loadUser()
  }, [userState?.user])

  return (
    <div className="profile-main-container main-app-container">
      <div className="main-app-sidemenu">
        <SideMenuProfile profileData={profileData} />
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