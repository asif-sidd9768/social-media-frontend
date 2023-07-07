import { createContext, useContext, useEffect, useReducer } from "react";

import { initialStatePost, postReducer } from "../reducers/PostReducer";
import { fetchPosts, postDislikeService, postLikeService } from "../services/postService";
import { dislikePostAction, postFailureAction, postLoadingAction, setPostAction } from "../actions/postActions";
import { NotificationContext } from "./NotificationContext";
import { UserContext } from "./UserContext";

export const PostContext = createContext()
export const PostProvider = ({children}) => {
  const [postState, postDispatch] = useReducer(postReducer, initialStatePost)
  const {userState} = useContext(UserContext)
  const {showNotification} = useContext(NotificationContext)

  async function loadPosts(){
      try{
        const {data} = await fetchPosts(postState?.page)
        postDispatch(setPostAction(data))
      }catch(error){
        console.log(error)
      }
    }
  useEffect(() => {
    if(userState?.token){
      loadPosts()
    }
  }, [userState])

  useEffect(() => {
    localStorage.setItem("exploreFeed", postState?.exploreFeed)
  }, [postState.exploreFeed])

  const handlePostLike = async (isLikedByUser, postId) => {
    if(postState.isLoading){
      showNotification("Some work is going on.", "info")
      return 
    }
    postDispatch(postLoadingAction())
    try {
      if (isLikedByUser) {
        const { status, data } = await postDislikeService(postId);
        if (status === 200) {
          postDispatch(dislikePostAction(data));
          showNotification("Unliked a Post.", "success")
        }
      } else {
        const { status, data } = await postLikeService(postId);
        if (status === 200) {
          postDispatch(setPostAction(data));
          showNotification("Liked a Post.", "success")
        }
      }
    } catch (error) {
      postDispatch(postFailureAction(error.data))
      showNotification("Failed to like/unlike post.", "error")
    }
  };

  return (
    <PostContext.Provider value={{postState, postDispatch, handlePostLike}}>
      {children}
    </PostContext.Provider>
  )
}