export const loginUserAction = (loginData) => ({
  type:"LOGIN_USER",
  payload: loginData
})

export const postBookmarkAction = (bookmarksData) => ({
  type:"BOOKMARK_POST",
  payload: bookmarksData
})

export const setAllUsersAction = (usersData) => ({
  type:"SET_ALL_USERS",
  payload: usersData
})

export const followUserAction = (data) => ({
  type:"FOLLOW_USER",
  payload: data
})

export const unfollowUserAction = (data) => ({
  type:"UNFOLLOW_USER",
  payload: data
})

export const changeFeedTypeOnProfileAction = (feedType) => ({
  type:"CHANGE_FEED_TYPE_PROFILE",
  payload: feedType
})

export const toggleProfileEditAction = () => ({
  type:"TOGGLE_PROFILE_EDIT"
})

export const updateUserProfileAction = (newData) => ({
  type:"UPDATE_USER_PROFILE",
  payload: newData
})

export const togglePostEditingAction = () => ({
  type:"TOGGLE_POST_EDITING"
})

export const joinEventAction = (eventData) => ({
  type:"JOIN_EVENT",
  payload:eventData
})

export const logoutAction = () => ({
  type:"LOGOUT_USER"
})

export const userStateLoadingAction = () => ({
  type:"USER_STATE_LOADING"
})

export const userStateFailureAction = (errorData) => ({
  type:"USER_STATE_FAILURE",
  payload: errorData
})

export const setUserStoriesAction = (storiesData) => ({
  type:"SET_USER_STORIES",
  payload: storiesData
})

export const storyViewAction = (storyData) => ({
  type:"STORY_VIEW",
  payload: storyData
})

export const setSearchParamAction = (searchParam) => ({
  type:"SET_SEARCH_PARAM",
  payload: searchParam
})

export const mobileSearchAction = (data) => ({
  type:"MOBILE_SEARCH",
  payload: data
})

export const setProfileUserAction = (userData) => ({
  type:"SET_PROFILE_USER",
  payload:userData
})