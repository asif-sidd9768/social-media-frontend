import { createContext, useContext, useEffect, useReducer } from "react";
import { initialStateUser, userReducer } from "../reducers/UserReducer";
import { followUserAction, loginUserAction, postBookmarkAction, setAllUsersAction, setUserStoriesAction, unfollowUserAction, userStateFailureAction, userStateLoadingAction } from "../actions/userActions";
import { followUserService, getAllStoriesService, getAllUsersService, loginUserService, unfollowUserService } from "../services/userService";
import { bookmarkPostService, removeBookmarkPostService } from "../services/postService";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/isLoggedIn";
import { NotificationContext } from "./NotificationContext";

export const UserContext = createContext()
export const UserProvider = ({children}) => {
  const [userState, userDispatch] = useReducer(userReducer, initialStateUser)
  const { showNotification } = useContext(NotificationContext)
  const navigate = useNavigate()
  const location = useLocation()

  async function loginUser (creds) {
    userDispatch(userStateLoadingAction())
    if(userState?.isLoading){
      showNotification("Some work is going on.", "info")
      return
    }
    try {
      const {status, data} = await loginUserService(creds)
      if(status === 200){
        userDispatch(loginUserAction(data))
        console.log('data' , data)
      }
      if(!localStorage.getItem("user")){
        localStorage.setItem("user", JSON.stringify({token: data.token, user: data.user}))
      }
      loadStories()
      loadAllUsers()
      showNotification(`Welcome, ${data?.user?.firstName} ${data?.user?.lastName[0]} `, "success")
      navigate(location?.state?.from?.pathname || "/")
    }catch(error){
      userDispatch(userStateFailureAction(error?.response?.data?.message))
      showNotification(error?.response?.data?.message, "error")
      
    }
  }


  async function loadAllUsers(){
    const {status, data} = await getAllUsersService()
    if(status === 200){
      userDispatch(setAllUsersAction(data))
    }
  }

  async function loadStories (){
    try{
      const result = await getAllStoriesService()
      userDispatch(setUserStoriesAction(result.data))
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    if(userState?.token){
      loadAllUsers()
    }
  }, [])

  useEffect(() => {
    if(userState?.token){
      loadStories()
    }
  },[])

  useEffect(() => {
    if(localStorage.getItem("user")){
      localStorage.setItem("user", JSON.stringify({token: userState.token, user: userState?.user}))
    }
  }, [userState])

  const handlePostBookmark = async (isBookmarkByUser, postId) => {
    userDispatch(userStateLoadingAction())
    if(userState?.isLoading){
      showNotification("Some work is going on.", "info")
      return
    }
    try {
      if (isBookmarkByUser) {
        // If the post is already bookmarked, call the removeBookmarkService or API endpoint
        const { status, data } = await removeBookmarkPostService(postId);
        if (status === 200) {
          userDispatch(postBookmarkAction(data.bookmarks));
          showNotification("Successfully to removed bookmark.", "success")
        }
      } else {
        // If the post is not bookmarked, call the addBookmarkService or API endpoint
        const { status, data } = await bookmarkPostService(postId);
        if (status === 200) {
          userDispatch(postBookmarkAction(data.bookmarks));
          showNotification("Successfully to bookmark post.", "success")
        }
      }
    } catch (error) {
      console.log(error);
      userDispatch(userStateFailureAction(error?.response?.data?.message))
      showNotification("Failed to bookmark post.", "error")
    }
  };

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

  return (
    <UserContext.Provider value={{userState, userDispatch, loginUser, handlePostBookmark, handleFollowUser}}>
      {children}
    </UserContext.Provider>
  )
}