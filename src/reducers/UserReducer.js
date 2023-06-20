export const initialStateUser = {
  token: JSON.parse(localStorage.getItem("user"))?.token || null,
  user: JSON.parse(localStorage.getItem("user"))?.user || {},
  isLoading: false,
  error: null,
  allUsers: []
}

export const userReducer = (state, action) => {
  switch(action.type){
    case "LOGIN_USER":
      return {...state, user: action.payload.user, token: action.payload.token, isLoading: false}
    case "BOOKMARK_POST":{
      return {...state, user: {...state.user, bookmarks: [...action.payload]}}
    }
    case "SET_ALL_USERS":
      return {...state, allUsers: action.payload}
    case "FOLLOW_USER":{
      console.log(action.payload)
      const allUsers = state.allUsers.map(user => user.id === action.payload.followUser.id ? action.payload.followUser : user)
      return {...state, user: action.payload.user, allUsers}
    }
    case "UNFOLLOW_USER":{
      const allUsers = state.allUsers.map(user => user.id === action.payload.followUser.id ? action.payload.followUser : user)
      return {...state, user: action.payload.user, allUsers}
    }
  }
}