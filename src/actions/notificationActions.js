export const setNotificationAction = (notifData) => ({
  type:"SET_NOTIFICATION",
  payload: notifData
})

export const removeNotificationAction = (id) => ({
  type: "REMOVE_NOTIFICATION",
  payload: id
})