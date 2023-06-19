import { useContext } from "react"

import {ThemeContext} from "../../../contexts/ThemeContext"

import "./Menu.css"
import { toggleThemeAction } from "../../../actions/themeActions"

export const Menu = () => {
  const {themeState, themeDispatch} = useContext(ThemeContext)
  return (
    <div className="menu-container">
      <div className="menu-left-side">
        <span><i className="fa-solid fa-house"></i></span>
        <span>Home</span>
        <span className="feed-btn-container">
          <span>
            Explore
          </span>
          <span>
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