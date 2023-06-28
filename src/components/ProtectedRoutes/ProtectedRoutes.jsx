import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Navigate, useLocation } from "react-router-dom"

export const ProtectedRoutes = ({isSignedIn,children}) => {
  const {userState} = useContext(UserContext)
  const location = useLocation()
  return (Object.keys(userState?.user).length > 0 && userState?.token) ? (
    children
  ) : (
    <Navigate to="/login" state={{from:location}} replace/>
  )
}