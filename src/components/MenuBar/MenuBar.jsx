import { useContext, useEffect, useState } from "react";

import MenuLogo from "../../assets/images/avatar1.jpg"
import { NavLink, useNavigate } from "react-router-dom";
import { PostContext, UserContext } from "../../main";

import "./MenuBar.css"

export const MenuBar = () => {
  const { postState, postDispatch } = useContext(PostContext)
  const { userState, userDispatch } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const handleLogout = async () => {
  //   cartDispatch(clearCartAction())
  //   userDispatch(removeUserAction())
  //   wishlistDispatch(removeWishlistItemsAction())
  //   await localStorage.removeItem("user")
  //   await localStorage.removeItem("wishlist")
  //   await localStorage.removeItem("cart")
  //   toggleMenu()
  //   showNotification("You're logged out.", "success")
  //   navigate("/", {replace: true})
  // }

  return (
    <div className="menubar-container">
      <div className="menubar-profile-btn"> 
        <NavLink to={`/profile/${userState?.user?.id}`}><i className="fa-solid fa-user"></i></NavLink>
      </div>
      <div onClick={toggleMenu} className="menubar-button">
        {isOpen ? 
          <span className="menubar-close-btn"><i className="fa-solid fa-circle-xmark"></i></span> 
          : <div className={`menubar-rotating-circle ${true ? "rotate" : ""}`}>
              <img src={userState?.user?.profileImg ?? MenuLogo} className="menubar-logo-img" />
            </div>
          }
      </div>
      <div className={`menubar-items ${isOpen ? "open" : ""}`}>
        {
          userState.user ? <div className="menubar-item menubar-item-logout">Logout</div> 
          : <div onClick={() => {navigate("/login"); toggleMenu()}} className="menubar-item menubar-item-logout">Login</div>
        }
        {/* <div className="menubar-item">Item 2</div>
        <div className="menubar-item">Item 3</div>
        <div className="menubar-item">Item 4</div> */}
      </div>
      <div className="menubar-cart-btn">
        <NavLink className="menubar-cart-link" to="/cart"><i className="fa-solid fa-cart-shopping"></i></NavLink>
      </div>
    </div>
  );
}