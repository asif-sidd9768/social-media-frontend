import { useContext } from "react"
import "./RightSideBar.css"
import { followUserService, unfollowUserService } from "../../../services/userService"
import { UserContext } from "../../../contexts/UserContext"
import { followUserAction, unfollowUserAction, userStateFailureAction, userStateLoadingAction } from "../../../actions/userActions"
import { NotificationContext } from "../../../main"

export const RightSideBar = () => {
  const { userState, userDispatch} = useContext(UserContext)
  const { showNotification } = useContext(NotificationContext)

  const handleFollowUser = async (userId, alreadyFollowing, username) => {
    try {
      userDispatch(userStateLoadingAction())
      if(alreadyFollowing){
        const {status, data} = await unfollowUserService(userId)
        userDispatch(unfollowUserAction(data))
        showNotification(`Unfollowed ${username}`, "success")
      }else{ 
        const {status, data} = await followUserService(userId)
        userDispatch(followUserAction(data))
        showNotification(`Followed ${username}`, "success")
      }
    }catch(error){
      console.log(error)
      userDispatch(userStateFailureAction(error.data))
      showNotification(`Failed to follow/unfollow`, "error")
    }
  }

  const filteredUsers = userState?.allUsers?.filter(user => user.id !== userState?.user?.id)

  return (
    <div className="suggestions-main">
      <p className="suggestions-heading">Suggestions For You</p>
      <div className="suggestions-container">
        {
          filteredUsers.map(user => 
            <div key={user.id} className="suggestions">
              <div className="suggestions-user">
                <span className="suggestions-user-icon">
                  {user?.profileImg ? <img className="suggestions-user-profile" src={user?.profileImg} /> : <span className="suggestions-user-profile"><i className="fa-solid fa-circle-user"></i></span>}
                </span>
                <span className="suggestions-text">
                  {/* <p>{user?.firstName} {user?.lastName[0]}</p> */}
                  <p className="suggestion-username">@{user?.username}</p>
                </span>
              </div>
              <div>
                <button onClick={() =>  handleFollowUser(user.id, userState?.user?.following?.some(foll => foll.id === user.id), user.username )} className="suggestions-follow-btn">{userState?.user?.following?.some(foll => foll.id === user.id) ? "Following" : "Follow"}</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}