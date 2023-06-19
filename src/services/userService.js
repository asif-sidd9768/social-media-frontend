import axios from "axios";

export const loginUserService = async (credentials) => {
  const response = await axios.post(`/api/auth/login`, credentials)
  return response
}