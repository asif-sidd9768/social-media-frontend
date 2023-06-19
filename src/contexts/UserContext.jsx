import { createContext, useEffect, useReducer } from "react";
import { initialStateUser, userReducer } from "../reducers/UserReducer";
import { loginUserAction } from "../actions/userActions";
import { loginUserService } from "../services/userService";

export const UserContext = createContext()
export const UserProvider = ({children}) => {
  const [userState, userDispatch] = useReducer(userReducer, initialStateUser)

  useEffect(() => {
    async function loadUser () {
      const creds = {username: "asif", password: "asifSiddique"}
      try {
        const {status, data} = await loginUserService(creds)
        if(status === 200){
          userDispatch(loginUserAction(data))
        }
        if(!localStorage.getItem("user")){
          localStorage.setItem("user", JSON.stringify({token: data.encodedToken, user: data.foundUser}))
        }
      }catch(error){
        console.log(error)
      }
    }
    loadUser()
  }, [])

  useEffect(() => {
    if(localStorage.getItem("user")){
      localStorage.setItem("user", JSON.stringify({token: userState.token, user: userState?.user}))
    }
  }, [userState])

  return (
    <UserContext.Provider value={{userState, userDispatch}}>
      {children}
    </UserContext.Provider>
  )
}