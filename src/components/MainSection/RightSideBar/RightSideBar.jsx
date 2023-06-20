import { useContext } from "react"
import "./RightSideBar.css"
import { followUserService, unfollowUserService } from "../../../services/userService"
import { UserContext } from "../../../contexts/UserContext"
import { followUserAction, unfollowUserAction } from "../../../actions/userActions"

export const RightSideBar = () => {
  const { userState, userDispatch} = useContext(UserContext)

  const handleFollowUser = async (userId, alreadyFollowing) => {
    try {
      if(alreadyFollowing){
        const {status, data} = await unfollowUserService(userId)
        userDispatch(unfollowUserAction(data))
      }else{ 
        const {status, data} = await followUserService(userId)
        userDispatch(followUserAction(data))
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <p className="suggestions-heading">Suggestions For You</p>
      <div className="suggestions-container">
        {
          userState?.allUsers.map(user => 
            <div key={user.id} className="suggestions">
              <div className="suggestions-user">
                <span className="suggestions-user-icon">
                  <i className="fa-solid fa-circle-user"></i>
                </span>
                <span className="suggestions-text">
                  <p>{user?.firstName} {user?.lastName[0]}</p>
                  <p className="suggestion-username">@{user?.username}</p>
                </span>
              </div>
              <div>
                <button onClick={() =>  handleFollowUser(user.id, userState.user.following.some(foll => foll.id === user.id) )} className="suggestions-follow-btn">{userState.user.following.some(foll => foll.id === user.id) ? "Following" : "Follow"}</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}