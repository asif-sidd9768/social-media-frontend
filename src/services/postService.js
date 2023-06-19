import axios from "axios"
const config = {
  headers: {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
  }
}

export const fetchPosts = async () => {
  const response = await axios.get(`/api/posts`)
  return response
}

export const feedPostService = async (feedData) => {
  const response = await axios.post(`/api/posts`, feedData , config)
  return response
}

export const postLikeService = async (postId) => {
  const response = await axios.post(`/api/posts/like/${postId}`, {},config)
  return response
}

export const bookmarkPostService = async (postId) => {
  const response = await axios.post(`/api/users/bookmark/${postId}`, {}, config)
  return response
}