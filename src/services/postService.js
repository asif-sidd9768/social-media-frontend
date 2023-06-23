import axios from "axios"
const config = {
  headers: {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
  }
}
const BASE_URL = "http://localhost:3000"
export const fetchPosts = async () => {
  // const response = await axios.get(`/api/posts`)
  const response = await axios.get('http://localhost:3000/api/posts')
  return response
}

export const feedPostService = async (feedData) => {
  console.log(config)
  const response = await axios.post(`${BASE_URL}/api/posts`, feedData , config)
  return response
}

export const postLikeService = async (postId) => {
  console.log({config})
  const response = await axios.post(`${BASE_URL}/api/posts/like/${postId}`, {}, config)
  return response
}

export const bookmarkPostService = async (postId) => {
  const response = await axios.post(`${BASE_URL}/api/user/bookmark/${postId}`, {}, config)
  return response
}

export const editPostService = async (postData, postId) => {
  const response = await axios.post(`${BASE_URL}/api/posts/edit/${postId}`, {postData}, config)
  return response
}

export const deletePostService = async (postId) => {
  const response = await axios.delete(`${BASE_URL}/api/posts/${postId}`,config)
  return response
}