export const loginUserAction = (loginData) => ({
  type:"LOGIN_USER",
  payload: loginData
})

export const postBookmarkAction = (bookmarksData) => ({
  type:"BOOKMARK_POST",
  payload: bookmarksData
})