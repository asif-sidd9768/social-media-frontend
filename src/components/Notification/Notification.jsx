import { useContext } from "react"
import { NavLink } from "react-router-dom"

import { NotificationContext } from "../../contexts/NotificationContext"

import "./Notification.css"

export const Notification = () => {
  const { notificationState } = useContext(NotificationContext)

  return (
    <div className="notification-stack">
      {notificationState.notifications.map(({content, type, id, showLogin}) => (
        <Notif key={id} content={content} type={type} showLogin={showLogin} />
      ))}
    </div>
  )
}

const Notif = ({content, type, showLogin}) => {
  return (
    <div className={`notification-container notification-${type}`}>
      <p className="notification-text">
        <span className={`notification-text-icon-${type}`}><i className={`fa-solid fa-${type==="success" ? "check" : "xmark"}`}></i></span>
        <span>{content} {showLogin ? <NavLink to="/login" className="notification-login-btn">Login</NavLink> : ""}</span>
      </p>
    </div>
  )
}
