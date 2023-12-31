import { useContext } from "react"

import {ThemeContext} from "../../../contexts/ThemeContext"
import { toggleThemeAction } from "../../../actions/themeActions"
import { PostContext } from "../../../contexts/PostContext"
import { toggleExploreFeedAction } from "../../../actions/postActions"
import { UserContext } from "../../../contexts/UserContext"
import { NavLink, useLocation } from "react-router-dom"
import { FeedToggleBtns } from "./FeedToggleBtns/FeedToggleBtns"

import "./Menu.css"

export const Menu = () => {
  const {themeState, themeDispatch} = useContext(ThemeContext)
  const { userState } = useContext(UserContext)
  const {postState, postDispatch} = useContext(PostContext)
  const location = useLocation()

  const handleFeedTypeToggleMobile = (type) => {
    const toSet = postState?.exploreFeed === "no" ? "yes" : "no"
    postDispatch(toggleExploreFeedAction(toSet))
  }

  return (
    <div className="menu-container">
      <div className="menu-left-side">
        <NavLink to="/" className="menu-home-btn">
          <span><i className="fa-solid fa-house"></i></span>
          <span className="menu-pathname">{location.pathname === "/" ? "Home" : location.pathname.split("/")[1]}</span>
        </NavLink>
        <span onClick={handleFeedTypeToggleMobile} className={`feed-explore-mobile ${postState?.exploreFeed === "yes" && "feed-explore-mobile-ticked"}`}><i className="fa-solid fa-compass"></i></span>
        {!location.pathname.includes("profile") && <div className="menu-explore">
          <FeedToggleBtns />
        </div>}
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
          <NavLink to={`/profile/${userState?.user?.username}`} className="menu-user-profile">
            {userState?.user?.profileImg ? <img className="suggestions-user-profile" src={userState?.user?.profileImg} /> : <i className="fa-solid fa-circle-user"></i>}
          </NavLink>
        </span>}
      </div>
    </div>
  )
}