import { useContext } from "react"

import {ThemeContext} from "../../../contexts/ThemeContext"

import "./Menu.css"
import { toggleThemeAction } from "../../../actions/themeActions"
import { PostContext } from "../../../contexts/PostContext"
import { toggleExploreFeedAction } from "../../../actions/postActions"

export const Menu = () => {
  const {themeState, themeDispatch} = useContext(ThemeContext)
  const { postState, postDispatch } = useContext(PostContext)

  const handleFeedTypeToggle = (type) => {
    if((type==="explore" && postState.exploreFeed) || (type==="myfeeds" && !postState.exploreFeed)){
      return
    }
    postDispatch(toggleExploreFeedAction())
  }

  return (
    <div className="menu-container">
      <div className="menu-left-side">
        <span><i className="fa-solid fa-house"></i></span>
        <span>Home</span>
        <span className="feed-btn-container">
          <span onClick={() => handleFeedTypeToggle("explore")} className={`${postState.exploreFeed && "active-feed-type"}`}>
            Explore
          </span>
          <span onClick={() => handleFeedTypeToggle("myfeeds")} className={`${!postState.exploreFeed && "active-feed-type"}`}>
            My Feeds
          </span>
        </span>
      </div>
      <div className="menu-profile-container">
        <span>
          <label className="switch">
            <input type="checkbox" checked={themeState.currentTheme === "light"} onChange={() => themeDispatch(toggleThemeAction())} />
            <span className="slider"></span>
          </label>
        </span>
        <span>
          Asif S
        </span>
        <span className="menu-user-profile">
          <i className="fa-solid fa-circle-user"></i>
        </span>
      </div>
    </div>
  )
}