
import { useContext, useState } from "react"
import "./SearchList.css"
import { UserContext } from "../../main"
import { UserCard } from "./UserCard/UserCard"
import { mobileSearchAction, setSearchParamAction } from "../../actions/userActions"

export const SearchList = () => {
  const { userState, userDispatch } = useContext(UserContext)

  const handleUserSearch = (event) => {
    userDispatch(setSearchParamAction(event.target.value))
  }

  const handleMobileSearch = () => {
    userDispatch(mobileSearchAction(false))
  }

  const filteredUsers = userState?.allUsers?.filter(({username}) => username?.toLowerCase().includes(userState?.searchParam.toLowerCase()))
  return (
    <div className={`search-list-container ${userState?.mobileSearch && "mobile-search"}`}>
      {userState?.mobileSearch && <span onClick={handleMobileSearch} className="mobile-search-close-btn">
        <i className="fa-solid fa-x"></i>
      </span>}
      {userState?.mobileSearch && <input placeholder="Type to search" onChange={handleUserSearch} className="side-menu-search-input mobile-search-input" />}
      <div className="search-list-main">
      {
        filteredUsers.length > 0 ? <>
          {
            filteredUsers.map(user => 
              <UserCard key={user.id} {...user} />
            )
          } 
        </> : <div>
          <p className="search-empty-main">No Users Found</p>
          <p className="search-empty-secondary">Try another combination</p>
        </div>
      }
      </div>
    </div>
  )
}