import { createContext, useReducer } from "react";
import { removeNotificationAction, setNotificationAction } from "../actions/notificationActions";
import { initialStateNotification, notificationReducer } from "../reducers/NotificationReducer";

export const NotificationContext = createContext()
export const NotificationProvider = ({children}) => {
  const [notificationState, notificationDispatch] = useReducer(notificationReducer, initialStateNotification)

  const showNotification = (content, type, showLogin=false) => {
    const id = new Date().getTime();
    notificationDispatch(setNotificationAction({content, type, id, showLogin}))
    setTimeout(() => {
      notificationDispatch(removeNotificationAction(id))
    }, 2000)
  }

  return (
    <NotificationContext.Provider value={{notificationState, showNotification}}>
      {children}
    </NotificationContext.Provider>
  )
}