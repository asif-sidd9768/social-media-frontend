
import { NavLink } from "react-router-dom"

import logoImgShort from "../../assets/images/logo-short-transparent.png"
import logoImg from "../../assets/images/logo-new.png"

import { FeedToggleBtns } from "../MainSection/Menu/FeedToggleBtns/FeedToggleBtns"
import { EventsTab } from "./EventsTab/EventsTab"
import { useContext, useEffect, useState } from "react"
import { getAllEvents } from "../../services/eventService"
import { UserContext } from "../../main"

import "./SideMenu.css"
import { SearchList } from "../SearchList/SearchList"
import { setSearchParamAction } from "../../actions/userActions"

export const SideMenu = () => {
  const [events, setEvents] = useState({eventsData: [], selectedEvent:null})
  const { userState, userDispatch } = useContext(UserContext)
  const getActiveStyles = ({isActive}) => ({
    color: isActive ?  "var(--liked)" : "",
    backgroundColor: isActive ? "var(--border-color)" : "",
    borderRadius: isActive ? "4px" : ""
  })

  useEffect(() => {
    async function loadEvents(){
      try {
        const result = await getAllEvents()
        const toSet = {
          eventsData: result.data,
          selectedEvent: result.data[0]
        }
        setEvents(toSet)
      }catch(error){
        console.log(error)
      }
    }
    loadEvents()
  }, [])

  const handleEventChange = (type) => {
    const { eventsData, selectedEvent } = events;
  
    if (type === "back") {
      const currentIndex = eventsData.findIndex((event) => event.id === selectedEvent.id);
      const newIndex = currentIndex === 0 ? eventsData.length - 1 : currentIndex - 1;
      setEvents((prevState) => ({
        ...prevState,
        selectedEvent: eventsData[newIndex],
      }));
    } else if (type === "forward") {
      const currentIndex = eventsData.findIndex((event) => event.id === selectedEvent.id);
      const newIndex = currentIndex === eventsData.length - 1 ? 0 : currentIndex + 1;
      setEvents((prevState) => ({
        ...prevState,
        selectedEvent: eventsData[newIndex],
      }));
    }
  };

  const handleUserSearch = (event) => {
    userDispatch(setSearchParamAction(event.target.value))
  }
  
  return (
    <aside className="side-menu-container">
      <img src={logoImg} className="side-menu-logo" />
      <img src={logoImgShort} className="side-menu-logo-short" />
      <div className="side-menu-search-container">
        <span className="side-menu-search-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
        <input placeholder="Search" onChange={handleUserSearch} className="side-menu-search-input" />
      </div>
      <div className="search-list-desktop">
        {userState?.searchParam && <SearchList />}
      </div>
      <div className="side-menu-explore">
        <FeedToggleBtns />
      </div>
      <div className="side-menu-nav">
        <NavLink to="/" style={getActiveStyles} className="side-menu-nav-item"><i className="fa-solid fa-house"></i><span className="nav-item-name">Home</span></NavLink>
        <NavLink to="/bookmarks" style={getActiveStyles} className="side-menu-nav-item"><i className="fa-solid fa-bookmark"></i><span className="nav-item-name">Bookmarks</span></NavLink>
        <NavLink to="/liked" style={getActiveStyles} className="side-menu-nav-item"><i className="fa-solid fa-heart"></i><span className="nav-item-name">Liked</span></NavLink>
        <NavLink to={`/profile/${userState?.user?.username}`} style={getActiveStyles} className="side-menu-nav-item"><i className="fa-solid fa-user"></i><span className="nav-item-name">Profile</span></NavLink>
      </div>
      <hr className="side-menu-divider" />
      <div className="side-menu-recent">
        <div className="side-menu-events-container">
          <span onClick={() => handleEventChange("back")} className="side-menu-event-back"><i className="fa-solid fa-arrow-left"></i></span>
          <EventsTab {...events.selectedEvent} events={events.eventsData} />
          <span onClick={() => handleEventChange("forward")} className="side-menu-event-forward"><i className="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    </aside>
  )
}