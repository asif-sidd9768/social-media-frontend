import axios from "axios"
import { RESOURCES } from "../utils/resources"
const config = {
  headers: {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
  }
}

export const getAllEvents = async () => {
  const response = await axios.get(`${RESOURCES.BASE_URL}/api/events`)
  return response
}

export const joinEventService = async (eventId, userId) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/events/${eventId}/join/${userId}`, {}, config)
  return response
}