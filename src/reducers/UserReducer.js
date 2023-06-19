export const initialStateUser = {
  token: JSON.parse(localStorage.getItem("user"))?.token || null,
  user: JSON.parse(localStorage.getItem("user"))?.user || {},
  isLoading: false,
  error: null
}

export const userReducer = (state, action) => {
  switch(action.type){
    case "LOGIN_USER":
      return {...state, user: action.payload.foundUser, token: action.payload.encodedToken, isLoading: false}
    case "BOOKMARK_POST":{
      return {...state, user: {...state.user, bookmarks: [...action.payload]}}
    }
  }
}