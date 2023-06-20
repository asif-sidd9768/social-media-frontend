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