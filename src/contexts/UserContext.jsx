import { createContext, useContext, useEffect, useReducer } from "react";
import { initialStateUser, userReducer } from "../reducers/UserReducer";
import { loginUserAction, postBookmarkAction, setAllUsersAction, userStateFailureAction, userStateLoadingAction } from "../actions/userActions";
import { getAllUsersService, loginUserService } from "../services/userService";
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
    try {
      const {status, data} = await loginUserService(creds)
      if(status === 200){
        userDispatch(loginUserAction(data))
      }
      if(!localStorage.getItem("user")){
        localStorage.setItem("user", JSON.stringify({token: data.token, user: data.user}))
      }
      showNotification(`Welcome, ${data?.user?.firstName} ${data?.user?.lastName[0]} `, "success")
      navigate(location?.state?.from?.pathname || "/")
    }catch(error){
      userDispatch(userStateFailureAction(error?.response?.data?.message))
      showNotification(error?.response?.data?.message, "error")
      
    }
  }

  useEffect(() => {
    async function loadAllUsers(){
      const {status, data} = await getAllUsersService()
      if(status === 200){
        userDispatch(setAllUsersAction(data))
      }
    }
    loadAllUsers()
  }, [])

  useEffect(() => {
    if(localStorage.getItem("user")){
      localStorage.setItem("user", JSON.stringify({token: userState.token, user: userState?.user}))
    }
  }, [userState])

  const handlePostBookmark = async (isBookmarkByUser, postId) => {
    userDispatch(userStateLoadingAction())
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

  return (
    <UserContext.Provider value={{userState, userDispatch, loginUser, handlePostBookmark}}>
      {children}
    </UserContext.Provider>
  )
}