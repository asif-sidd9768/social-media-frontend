import axios from "axios";
const BASE_URL = "http://localhost:3000"

const config = {
  headers: {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
  }
}

export const getAllUsersService = async () => {
  const response = await axios.get(`${BASE_URL}/api/user/all`)
  return response
}

export const loginUserService = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/api/user/login`, credentials)
  return response
}

export const followUserService = async (followUserId) => {
  const response = await axios.post (`${BASE_URL}/api/user/follow/${followUserId}`, {}, config)
  console.log(response)
  return response
}

export const unfollowUserService = async (followUserId) => {
  const response = await axios.post (`${BASE_URL}/api/user/unfollow/${followUserId}`, {}, config)
  console.log(response)
  return response
}