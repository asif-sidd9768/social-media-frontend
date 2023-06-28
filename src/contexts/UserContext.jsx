import { createContext, useEffect, useReducer } from "react";
import { initialStateUser, userReducer } from "../reducers/UserReducer";
import { loginUserAction, setAllUsersAction } from "../actions/userActions";
import { getAllUsersService, loginUserService } from "../services/userService";

export const UserContext = createContext()
export const UserProvider = ({children}) => {
  const [userState, userDispatch] = useReducer(userReducer, initialStateUser)


  async function loginUser (creds) {
    try {
      const {status, data} = await loginUserService(creds)
      if(status === 200){
        userDispatch(loginUserAction(data))
      }
      if(!localStorage.getItem("user")){
        localStorage.setItem("user", JSON.stringify({token: data.token, user: data.user}))
      }
    }catch(error){
      console.log(error)
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

  return (
    <UserContext.Provider value={{userState, userDispatch, loginUser}}>
      {children}
    </UserContext.Provider>
  )
}