export const setPostAction = (postData) => ({
  type:"SET_POSTS",
  payload: postData
})

export const setPostFailureAction = (errorData) => ({
  type:"SET_POSTS_FAILURE",
  payload: errorData
})