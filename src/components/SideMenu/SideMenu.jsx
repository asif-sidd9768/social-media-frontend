
import { NavLink } from "react-router-dom"

import logoImg from "../../assets/images/logo-transparent.png"
import "./SideMenu.css"

export const SideMenu = () => {
  const getActiveStyles = ({isActive}) => ({
    color: isActive ?  "var(--liked)" : "",
    backgroundColor: isActive ? "var(--border-color)" : "",
    borderRadius: isActive ? "4px" : ""
  })
  return (
    <aside className="side-menu-container">
      <img src={logoImg} className="side-menu-logo" />
      <div className="side-menu-search-container">
        <span className="side-menu-search-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
        <input placeholder="Search" className="side-menu-search-input" />
      </div>
      <div className="side-menu-nav">
        <NavLink to="/" style={getActiveStyles} className="side-menu-nav-item"><i className="fa-solid fa-house"></i>Home</NavLink>
        <NavLink to="/bookmark" style={getActiveStyles} className="side-menu-nav-item"><i className="fa-solid fa-bookmark"></i>Bookmark</NavLink>
        <NavLink to="/liked" style={getActiveStyles} className="side-menu-nav-item"><i className="fa-solid fa-heart"></i>Liked</NavLink>
        <NavLink to="/friends" style={getActiveStyles} className="side-menu-nav-item"><i className="fa-solid fa-user-group"></i>Friends</NavLink>
      </div>
      <hr className="side-menu-divider" />
      <div className="side-menu-recent">
        <span className="side-menu-recent-heading">
          Your recent Likes
        </span>
        <div className="side-menu-recent-like">
          <span>
            <i className="fa-solid fa-image"></i>
          </span>
          <span>
            There's something wrong with him.
          </span>
        </div>
        <div className="side-menu-recent-like">
          <span>
            <i className="fa-solid fa-image"></i>
          </span>
          <span>
            There's something wrong with him.
          </span>
        </div>
        <div className="side-menu-recent-like">
          <span>
            <i className="fa-solid fa-image"></i>
          </span>
          <span>
            There's something wrong with him.
          </span>
        </div>
      </div>
    </aside>
  )
}