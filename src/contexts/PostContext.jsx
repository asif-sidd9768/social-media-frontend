import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

import { initialStatePost, postReducer } from "../reducers/PostReducer";
import { fetchPosts } from "../services/postService";
import { setPostAction } from "../actions/postActions";

export const PostContext = createContext()
export const PostProvider = ({children}) => {
  const [postState, postDispatch] = useReducer(postReducer, initialStatePost)

  async function loadPosts(){
      try{
        const {data} = await fetchPosts(postState?.page)
        postDispatch(setPostAction(data))
        // if(!localStorage.getItem("posts")){
        //   localStorage.setItem("posts", JSON.stringify(data))
        // }
      }catch(error){
        console.log(error)
      }
    }
  useEffect(() => {
    loadPosts()
  }, [])

  // useEffect(() => {
  //   if(localStorage.getItem("posts")){
  //     localStorage.setItem("posts", JSON.stringify(postState.posts))
  //   }
  // }, [postState])

  return (
    <PostContext.Provider value={{postState, postDispatch}}>
      {children}
    </PostContext.Provider>
  )
}