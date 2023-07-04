import axios from "axios"
import { RESOURCES } from "../utils/resources"
const config = {
  headers: {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
  }
}
export const fetchPosts = async (page) => {
  // const response = await axios.get(`/api/posts`)
  const response = await axios.get(`${RESOURCES.BASE_URL}/api/posts?page=${page}&limit=30`)
  return response
}

export const feedPostService = async (feedData) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/posts`, feedData , config)
  return response
}

export const postLikeService = async (postId) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/posts/like/${postId}`, {}, config)
  return response
}

export const bookmarkPostService = async (postId) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/user/bookmark/${postId}`, {}, config)
  return response
}

export const removeBookmarkPostService = async (postId) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/user/remove-bookmark/${postId}`, {}, config)
  return response
}

export const editPostService = async (postData, postId) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/posts/edit/${postId}`, postData, config)
  return response
}

export const deletePostService = async (postId) => {
  const response = await axios.delete(`${RESOURCES.BASE_URL}/api/posts/${postId}`,config)
  return response
}

export const postDislikeService = async (postId) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/posts/dislike/${postId}`, {}, config)
  return response
}

export const createPostCommentService = async (postId, commentData) => {
  const response = await axios.post(`${RESOURCES.BASE_URL}/api/posts/comment/${postId}`, {commentData}, config)
  return response
}