import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Navigate, useLocation } from "react-router-dom"

export const ProtectedRoutes = ({isSignedIn,children}) => {
  const {userState} = useContext(UserContext)
  const location = useLocation()
  return isSignedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{from:location}} replace/>
  )
}