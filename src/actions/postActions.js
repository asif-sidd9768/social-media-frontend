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

export const editPostAction = (postData) => ({
  type:"EDIT_POST",
  payload: postData
})

export const deletePostAction = (postId) => ({
  type:"DELETE_POST",
  payload: postId
})

export const togglePostFilterAction = (filterData) => ({
  type: "TOGGLE_FILTER",
  payload: filterData
})