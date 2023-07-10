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

export const fetchPosts = async (page) => {
  const response = await axiosInstance.get(`${RESOURCES.BASE_URL}/api/posts`)
  return response
}

export const feedPostService = async (feedData) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/posts`, feedData)
  return response
}

export const postLikeService = async (postId) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/posts/like/${postId}`, {})
  return response
}

export const bookmarkPostService = async (postId) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/user/bookmark/${postId}`, {})
  return response
}

export const removeBookmarkPostService = async (postId) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/user/remove-bookmark/${postId}`, {})
  return response
}

export const editPostService = async (postData, postId) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/posts/edit/${postId}`, postData)
  return response
}

export const deletePostService = async (postId) => {
  const response = await axiosInstance.delete(`${RESOURCES.BASE_URL}/api/posts/${postId}`)
  return response
}

export const postDislikeService = async (postId) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/posts/dislike/${postId}`, {})
  return response
}

export const createPostCommentService = async (postId, commentData) => {
  const response = await axiosInstance.post(`${RESOURCES.BASE_URL}/api/posts/comment/${postId}`, {commentData})
  return response
}