import { useContext, useRef, useState } from "react"

import { UserContext } from "../../main"
import { toggleProfileEditAction, updateUserProfileAction } from "../../actions/userActions"
import { updateUserService } from "../../services/userService"
import { ProfileImgPicker } from "./ProfileImgPicker/ProfileImgPicker"
import { SideMenuProfileSkeleton } from "./SideMenuProfileSkeleton"

import profileBg from "../../assets/images/profile-bg.jpg"
import logoImg from "../../assets/images/logo-new.png"
import "./SideMenuProfile.css"

export const SideMenuProfile = ({profileData}) => {
  const {userState, userDispatch, handleFollowUser} = useContext(UserContext)
  const [showPicker, setShowPicker] = useState(false)
  const profilePickerRef = useRef(null)

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
    setShowPicker(!showPicker)
  }

  if(userState?.isLoading || !userState?.profileUser){
    return <SideMenuProfileSkeleton />
  }
  
  const isCurrentUser = userState?.user?.username === userState?.profileUser?.username
  const isFollowing = userState?.user?.following?.some(foll => foll.id === profileData?.id)

  return (
    <aside className="side-menu-profile-container">
      <img src={logoImg} className="side-menu-profile-logo" />
      <form onSubmit={handleProfileChange}>
        <div className="side-menu-profile-user">
          <div className="profile-bg-container">
            <img src={profileBg} className="profile-bg" />
          </div>
          {isCurrentUser && <span className="profile-edit-btn" onClick={() => userDispatch(toggleProfileEditAction())}>
            <i className="fa-regular fa-pen-to-square"></i>Edit
          </span>}
          <div className="profile-foll-container">
            <div className="profile-followers">
              <p>{profileData?.followers?.length}</p>
              <p>Followers</p>
            </div>
            <div className="profile-img-container">
              {showPicker && <div className="profile-picker" ref={profilePickerRef}>
                <ProfileImgPicker toggleImagePicker={toggleImagePicker} />
              </div>}
              {profileData?.profileImg ? 
                <img src={profileData?.profileImg} className="profile-img" /> :
                <i className="fa-solid fa-circle-user profile-img"></i>}
              {isCurrentUser && <span onClick={toggleImagePicker} className="profile-edit-icon">
                <i className="fa-solid fa-edit"></i>
              </span>}
            </div>
            <div className="profile-following">
              <p>{profileData?.following?.length}</p>
              <p>Following</p>
            </div>
          </div>
          <div className="profile-details">
            <div className="profile-name">
              <input type="text" className={`profile-${userState.isProfileEditing ? "is" : "not"}-editing-text`} defaultValue={`${profileData?.firstName}`} readOnly={!userState?.isProfileEditing}/>
              <input type="text" className={`profile-${userState.isProfileEditing ? "is" : "not"}-editing-text`} defaultValue={`${profileData?.lastName}`} readOnly={!userState?.isProfileEditing}/>
            </div>
            <p className="profile-username">@{profileData?.username}</p>
            {profileData?.bio && <textarea type="text" className={`profile-bio profile-${userState.isProfileEditing ? "is" : "not"}-editing-text`} defaultValue={`${profileData?.bio}`} readOnly={!userState?.isProfileEditing}/>}
            {userState?.profileUser?.username !== userState?.user?.username && <button onClick={() => handleFollowUser(profileData?.id, isFollowing, profileData?.username )} className="profile-follow-btn">{isFollowing ? "Unfollow" : "Follow"}</button>}
          </div>
          <div className={`profile-url ${userState?.isProfileEditing ? "" : "profile-url-radius"}`}>
            {
              userState?.isProfileEditing 
              ? <input type="text" className={`profile-${userState.isProfileEditing ? "is" : "not"}-editing-text`} defaultValue={"www.asifsiddique.in"} readOnly={!userState.isProfileEditing}/>
              : <a href="#" target="_blank">{profileData?.url ? profileData?.url : "Nothing..."} <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
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