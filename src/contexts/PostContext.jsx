import { createContext, useEffect, useReducer } from "react";

import { initialStatePost, postReducer } from "../reducers/PostReducer";
import { fetchPosts, postDislikeService, postLikeService } from "../services/postService";
import { dislikePostAction, setPostAction } from "../actions/postActions";

export const PostContext = createContext()
export const PostProvider = ({children}) => {
  const [postState, postDispatch] = useReducer(postReducer, initialStatePost)

  async function loadPosts(){
      try{
        const {data} = await fetchPosts(postState?.page)
        postDispatch(setPostAction(data))
      }catch(error){
        console.log(error)
      }
    }
  useEffect(() => {
    loadPosts()
  }, [])

  const handlePostLike = async (isLikedByUser, postId) => {
    try {
      if (isLikedByUser) {
        const { status, data } = await postDislikeService(postId);
        console.log(data)
        if (status === 200) {
          postDispatch(dislikePostAction(data));
        }
      } else {
        const { status, data } = await postLikeService(postId);
        if (status === 200) {
          postDispatch(setPostAction(data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider value={{postState, postDispatch, handlePostLike}}>
      {children}
    </PostContext.Provider>
  )
}