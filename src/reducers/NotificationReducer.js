export const initialStateNotification = {
  notifications: []
}

export const notificationReducer = (state, action) => {
  switch(action.type){
    case "SET_NOTIFICATION": 
      return {
        ...state,
        notifications: [
          ...state.notifications, 
          action.payload
        ]
      }
    case "REMOVE_NOTIFICATION":
      return {
        ...state, 
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      }
    default:
      return state;
  }
}
