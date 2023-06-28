import { useContext } from "react"

import {ThemeContext} from "../../../contexts/ThemeContext"

import "./Menu.css"
import { toggleThemeAction } from "../../../actions/themeActions"
import { PostContext } from "../../../contexts/PostContext"
import { toggleExploreFeedAction } from "../../../actions/postActions"
import { UserContext } from "../../../contexts/UserContext"
import { NavLink } from "react-router-dom"
import { FeedToggleBtns } from "./FeedToggleBtns/FeedToggleBtns"

export const Menu = () => {
  const {themeState, themeDispatch} = useContext(ThemeContext)
  const { postState, postDispatch } = useContext(PostContext)
  const { userState } = useContext(UserContext)

  return (
    <div className="menu-container">
      <div className="menu-left-side">
        <NavLink to="/" className="menu-home-btn">
          <span><i className="fa-solid fa-house"></i></span>
          <span>Home</span>
        </NavLink>
        <div className="menu-explore">
          <FeedToggleBtns />
        </div>
      </div>
      <div className="menu-profile-container">
        <span>
          <label className="switch">
            <input type="checkbox" checked={themeState.currentTheme === "light"} onChange={() => themeDispatch(toggleThemeAction())} />
            <span className="slider"></span>
          </label>
        </span>
        {userState?.token && <span>
          {userState?.user?.firstName} {userState?.user?.lastName[0] }
        </span>}
        {userState?.token && <span className="">
          <NavLink to={`/profile/${userState?.user?.id}`} className="menu-user-profile">
            {/* <i className="fa-solid fa-circle-user"></i> */}
            {userState?.user?.profileImg ? <img className="suggestions-user-profile" src={userState?.user?.profileImg} /> : <i className="fa-solid fa-circle-user"></i>}
          </NavLink>
        </span>}
      </div>
    </div>
  )
}