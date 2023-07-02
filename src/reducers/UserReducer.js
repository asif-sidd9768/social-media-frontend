export const initialStateUser = {
  token: JSON.parse(localStorage.getItem("user"))?.token || null,
  user: JSON.parse(localStorage.getItem("user"))?.user || {},
  isLoading: false,
  error: null,
  allUsers: [],
  feedOnUserProfile: "my",
  isProfileEditing: false,
  isPostEditing: false,
}

export const userReducer = (state, action) => {
  switch(action.type){
    case "USER_STATE_LOADING":
      console.log('here==== ')
      return {...state, isLoading: true}
    case "USER_STATE_FAILURE":
      return {...state, error:action.payload, isLoading: false}
    case "LOGIN_USER":
      return {...state, user: action.payload.user, token: action.payload.token, isLoading: false}
    case "BOOKMARK_POST":{
      return {...state, user: {...state.user, bookmarks: [...action.payload]}, isLoading: false}
    }
    case "SET_ALL_USERS":
      return {...state, allUsers: action.payload, isLoading: false}
    case "FOLLOW_USER":{
      const allUsers = state.allUsers.map(user => user.id === action.payload.followUser.id ? action.payload.followUser : user)
      return {...state, user: action.payload.user, allUsers, isLoading: false}
    }
    case "UNFOLLOW_USER":{
      const allUsers = state.allUsers.map(user => user.id === action.payload.followUser.id ? action.payload.followUser : user)
      return {...state, user: action.payload.user, allUsers, isLoading: false}
    }
    case "CHANGE_FEED_TYPE_PROFILE":
      return {...state, feedOnUserProfile: action.payload, isLoading: false}
    case "TOGGLE_PROFILE_EDIT":
      return {...state, isProfileEditing: !state.isProfileEditing, isLoading: false}
    case "UPDATE_USER_PROFILE":
      return {...state, user:action.payload, isLoading: false}
    case "TOGGLE_POST_EDITING":
      return {...state, isPostEditing: !state.isPostEditing, isLoading: false}
    case "JOIN_EVENT":
      return {...state, user: {...state.user, eventsJoined: [...state.user.eventsJoined, action.payload]}, isLoading: false}
    case "LOGOUT_USER":
      return {...state, user:{}, token: null}
    default:
      return {...state}
  }
}