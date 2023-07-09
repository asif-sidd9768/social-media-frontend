import { useContext } from "react"
import "./RightSideBar.css"
import { followUserService, unfollowUserService } from "../../../services/userService"
import { UserContext } from "../../../contexts/UserContext"
import { followUserAction, unfollowUserAction, userStateFailureAction, userStateLoadingAction } from "../../../actions/userActions"
import { NotificationContext } from "../../../main"

export const RightSideBar = () => {
  const { userState, handleFollowUser} = useContext(UserContext)

  const filterCurrentUser = (users) => {
    return users.filter(user => (user.id !== userState?.user?.id))
  }

  const filterFollowedUsers = (users) => {
    const usersFilter = filterCurrentUser(users)
    return userState?.user?.following.length < 1 ? usersFilter : usersFilter.filter((user) => userState?.user.following.some(f => f.id !== user.id))
  }

  const filteredUsers = filterFollowedUsers(userState?.allUsers)

  return (
    <div className="suggestions-main">
      <p className="suggestions-heading">Suggestions For You</p>
      <div className="suggestions-container">
        {
          filteredUsers.slice(0,5).map(user => 
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