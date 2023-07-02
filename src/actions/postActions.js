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

export const toggleExploreFeedAction = (feedType) => ({
  type:"TOGGLE_EXPLORE_FEED",
  payload: feedType
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

export const dislikePostAction = (postData) => ({
  type:"DISLIKE_POST",
  payload:postData
})

export const createNewPostAction = (postData) => ({
  type:"CREATE_NEW_POST",
  payload: postData
})

export const createNewPostSuccessAction = () => ({
  type:"CREATE_NEW_POST_EMPTY",
})

export const updatePageAction = () => ({
  type:"UPDATE_PAGE"
})

export const toggleEmojiPickerAction = (value) => ({
  type:"TOGGLE_EMOJI_PICKER",
  payload:value
})

export const createNewComment = (commentData) => ({
  type:"CREATE_NEW_COMMENT",
  payload: commentData
})

export const postLoadingAction = () => ({
  type:"POST_LOADING_STATE"
})

export const postFailureAction = (errorData) => ({
  type:"POST_LOADING_FAILURE",
  payload: errorData
})