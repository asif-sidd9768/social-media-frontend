

import profileBg from "../../assets/images/profile-bg.jpg"
import profileImg from "../../assets/images/profile.jpg"
import logoImg from "../../assets/images/logo-new.png"
import "./SideMenuProfile.css"
import { useContext, useRef, useState } from "react"
import { UserContext } from "../../main"
import { toggleProfileEditAction, updateUserProfileAction } from "../../actions/userActions"
import { updateUserProfileImgService, updateUserService } from "../../services/userService"
import { ProfileImgPicker } from "./ProfileImgPicker/ProfileImgPicker"

export const SideMenuProfile = () => {
  const {userState, userDispatch} = useContext(UserContext)
  const [showPicker, setShowPicker] = useState(false)
  

  const handleProfileChange = async (event) => {
    event.preventDefault()
    const updatedValues = {
      firstName: event.target[0].value,
      lastName: event.target[1].value,
      bio: event.target[2].value,
      url: event.target[3].value
    }
    try {
      const result = await updateUserService(updatedValues)
      userDispatch(toggleProfileEditAction())
      userDispatch(updateUserProfileAction(result.data))
    }catch(error){
      console.log(error)
    }
  }

  const toggleImagePicker = () => {
    console.log('cliced')
    setShowPicker(!showPicker)
  }
  
  return (
    <aside className="side-menu-profile-container">
      <img src={logoImg} className="side-menu-profile-logo" />
      <form onSubmit={handleProfileChange}>
        <div className="side-menu-profile-user">
          <div className="profile-bg-container">
            <img src={profileBg} className="profile-bg" />
          </div>
          <span className="profile-edit-btn" onClick={() => userDispatch(toggleProfileEditAction())}>
            <i className="fa-regular fa-pen-to-square"></i>Edit
          </span>
          <div className="profile-foll-container">
            <div className="profile-followers">
              <p>{userState?.user?.followers?.length}</p>
              <p>Followers</p>
            </div>
            <div className="profile-img-container">
              {showPicker && <div className="profile-picker">
                <ProfileImgPicker toggleImagePicker={toggleImagePicker} />
              </div>}
              {userState?.user?.profileImg ? 
                <img src={userState?.user?.profileImg} className="profile-img" onClick={toggleImagePicker} /> :
                <i onClick={toggleImagePicker} className="fa-solid fa-circle-user profile-img"></i>}
            </div>
            <div className="profile-following">
              <p>{userState?.user?.following?.length}</p>
              <p>Following</p>
            </div>
          </div>
          <div className="profile-details">
            <div className="profile-name">
              <input type="text" className={`profile-${userState.isProfileEditing ? "is" : "not"}-editing-text`} defaultValue={`${userState?.user?.firstName}`} readOnly={!userState?.isProfileEditing}/>
              <input type="text" className={`profile-${userState.isProfileEditing ? "is" : "not"}-editing-text`} defaultValue={`${userState?.user?.lastName}`} readOnly={!userState?.isProfileEditing}/>
            </div>
            <p className="profile-username">@{userState?.user?.username}</p>
            <textarea type="text" className={`profile-bio profile-${userState.isProfileEditing ? "is" : "not"}-editing-text`} defaultValue={`${userState?.user.bio}`} readOnly={!userState?.isProfileEditing}/>
          </div>
          <div className={`profile-url ${userState?.isProfileEditing ? "" : "profile-url-radius"}`}>
            {
              userState?.isProfileEditing 
              ? <input type="text" className={`profile-${userState.isProfileEditing ? "is" : "not"}-editing-text`} defaultValue={"www.asifsiddique.in"} readOnly={!userState.isProfileEditing}/>
              : <a href="#" target="_blank">www.asifsiddique.in <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
            } 
          </div>
          {
            userState?.isProfileEditing && <div className="profile-save-btn">
            <button type="submit">Save</button>
          </div>
          }
        </div>
      </form>
    </aside>
  )
}