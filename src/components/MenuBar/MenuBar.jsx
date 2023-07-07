import { useContext, useEffect, useState } from "react";

import MenuLogo from "../../assets/images/new-logo.jpeg"
import { NavLink, useNavigate } from "react-router-dom";
import { NotificationContext, PostContext, UserContext } from "../../main";

import "./MenuBar.css"
import { logoutAction, mobileSearchAction } from "../../actions/userActions";
import { addNewPostAction } from "../../actions/postActions";

export const MenuBar = () => {
  const { userState, userDispatch } = useContext(UserContext)
  const { postState, postDispatch } = useContext(PostContext)
  const { showNotification } = useContext(NotificationContext)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    userDispatch(logoutAction())
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    toggleMenu()
    showNotification("You're logged out.", "success")
    navigate("/login", {replace: true})
  }

  const handleMobileSearch = () => {
    toggleMenu(!isOpen)
    userDispatch(mobileSearchAction(true))
  }

  return (
    <div className="menubar-container">
      <div className="menubar-profile-btn"> 
        <NavLink onClick={() => postDispatch(addNewPostAction(true))}><i className="fa-solid fa-square-plus"></i></NavLink>
      </div>
      <div onClick={toggleMenu} className="menubar-button">
        {isOpen ? 
          <span className="menubar-close-btn"><i className="fa-solid fa-circle-xmark"></i></span> 
          : <div className={`menubar-rotating-circle ${(userState?.isLoading || postState?.isLoading) ? "rotate" : ""}`}>
              <img src={userState?.user?.profileImg ?? MenuLogo} className="menubar-logo-img" />
            </div>
          }
      </div>
      <div className={`menubar-items ${isOpen ? "open" : ""}`}>
        {
          (userState?.token) ? <div onClick={handleLogout} className="menubar-item menubar-item-logout">Logout</div> 
          : <div onClick={() => {navigate("/login"); toggleMenu()}} className="menubar-item menubar-item-logout">Login</div>
        }
        <div onClick={handleMobileSearch} className="menubar-item menubar-item-mobile-search">Search</div>
        {/* <div className="menubar-item">Item 3</div> */}
        {/* <div className="menubar-item">Item 4</div> */}
      </div>
      <div className="menubar-cart-btn">
        <NavLink className="menubar-cart-link" to="/bookmarks"><i className="fa-solid fa-bookmark"></i></NavLink>
      </div>
    </div>
  );
}