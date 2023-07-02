import { useContext } from "react"
import { joinEventService } from "../../../services/eventService"
import "./EventsTab.css"
import { NotificationContext, UserContext } from "../../../main"
import { checkEventJoined } from "../../../utils/checkEventJoined"
import { joinEventAction, updateUserProfileAction, userStateFailureAction, userStateLoadingAction } from "../../../actions/userActions"

export const EventsTab = ({id, name, image,events}) => {
  const { userState, userDispatch } = useContext(UserContext)
  const { showNotification } = useContext(NotificationContext)
  
  const isEventJoined = checkEventJoined(userState?.user?.eventsJoined, id)
  const handleEventJoin = async () => {
    userDispatch(userStateLoadingAction())
    try {
      const result = await joinEventService(id, userState?.user?.id)
      userDispatch(updateUserProfileAction(result.data))
      showNotification("Joined an event.", "success")
    }catch(error){
      console.log(error)
      userDispatch(userStateFailureAction(error.data))
      showNotification("Failed to join.", "error")
    }
  }

  return (
    <div className="events-container">
      <div>
        <p>Upcoming events</p>
      </div>
      <div className="events-img-container">
        <img className="events-img" src={image} />
        <span className="events-title">
          {name}
        </span>
        <div className="events-btn-container">
          <button disabled={isEventJoined} className="events-btn" onClick={handleEventJoin}>{isEventJoined ? "JOINED" : "JOIN EVENT"}</button>
        </div>
      </div>
    </div>
  )
}