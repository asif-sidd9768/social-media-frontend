import axios from "axios";
import { RESOURCES } from "../utils/resources";

// const getToken = async () => {
//   const token = await JSON.parse(localStorage.getItem("user"))?.token
//   const config = {
//     headers: {
//       authorization: `Bearer ${token}`
//     }
//   }
//   return config
// }

// Create an axios instance
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


export const getAllUsersService = async () => {
  const response = await axiosInstance.get(`${RESOURCES.BASE_URL}/api/user/all`)
  return response
}

export const getUserService = async (username) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/user/${username}`)
  return response
}

export const loginUserService = async (credentials) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/user/login`, credentials)
  return response
}

export const registerUserService = async (userData) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/user/register`, userData)
  return response
}

export const followUserService = async (followUserId) => {
  const response = await axiosInstance.post (`${RESOURCES.BASE_URL}/api/user/follow/${followUserId}`, {})
  console.log(response)
  return response
}

export const unfollowUserService = async (followUserId) => {
  const response = await axiosInstance.post (`${RESOURCES.BASE_URL}/api/user/unfollow/${followUserId}`, {})
  console.log(response)
  return response
}

export const updateUserService = async (userData) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/user/edit`, {userData})
  return response
}

export const updateUserProfileImgService = async (formData) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/user/edit/profile`, formData)
  return response
}

export const storyPostService = async (userId, formData) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/user/${userId}/story`, formData)
  return response
}

export const getAllStoriesService = async () => {
  const response = await axiosInstance.get(`${RESOURCES.BASE_URL}/api/user/stories`)
  return response
}

export const storyViewService = async (userId, storyId) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/user/${userId}/story/${storyId}`, {})
  return response
}