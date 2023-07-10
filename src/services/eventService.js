import axios from "axios"
import { RESOURCES } from "../utils/resources"

const axiosInstance = axios.create({
  baseURL: RESOURCES.BASE_URL
});

// Add an interceptor for requests
axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getAllEvents = async () => {
  const response = await axiosInstance.get(`${RESOURCES.BASE_URL}/api/events`)
  return response
}

export const joinEventService = async (eventId, userId) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/events/${eventId}/join/${userId}`, {})
  return response
}