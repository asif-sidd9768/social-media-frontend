import { createContext, useReducer } from "react";
import { initialStateProfile, profileReducer } from "../reducers/ProfileReducer";

export const ProfileContext = createContext()
export const ProfileProvider = ({children}) => {
  const [profileState, profileDispatch] = useReducer(profileReducer, initialStateProfile)
  return (
    <ProfileContext.Provider value={{profileState, profileDispatch}}>
      {children}
    </ProfileContext.Provider>
  )
}