export const setPostAction = (postData) => ({
  type:"SET_POSTS",
  payload: postData
})

export const setPostFailureAction = (errorData) => ({
  type:"SET_POSTS_FAILURE",
  payload: errorData
})

export const addPostAction = (postData) => ({
  type:"ADD_POST",
  payload: postData
})

export const toggleExploreFeedAction = () => ({
  type:"TOGGLE_EXPLORE_FEED"
})