export const checkEventJoined = (userEvents, eventId) => {
  return userEvents?.find((uE) => (uE.id ?? uE._id) === eventId )
}