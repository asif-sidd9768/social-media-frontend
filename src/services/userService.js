import axios from "axios";
import { RESOURCES } from "../utils/resources";

const config = {
  headers: {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
  }
}

export const getAllUsersService = async () => {
  const response = await axios.get(`${RESOURCES.BASE_URL}/api/user/all`)
  return response
}

export const loginUserService = async (credentials) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/user/login`, credentials)
  return response
}

export const registerUserService = async (userData) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/user/register`, userData)
  return response
}

export const followUserService = async (followUserId) => {
  const response = await axios.post (`${RESOURCES.BASE_URL}/api/user/follow/${followUserId}`, {}, config)
  console.log(response)
  return response
}

export const unfollowUserService = async (followUserId) => {
  const response = await axios.post (`${RESOURCES.BASE_URL}/api/user/unfollow/${followUserId}`, {}, config)
  console.log(response)
  return response
}

export const updateUserService = async (userData) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/user/edit`, {userData}, config)
  return response
}

export const updateUserProfileImgService = async (formData) => {
  console.log(config)
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/user/edit/profile`, formData, config)
  return response
}

export const storyPostService = async (userId, formData) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/user/${userId}/story`, formData, config)
  return response
}

export const getAllStoriesService = async () => {
  const response = await axios.get(`${RESOURCES.BASE_URL}/api/user/stories`, config)
  return response
}

export const storyViewService = async (userId, storyId) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/user/${userId}/story/${storyId}`, {}, config)
  return response
}