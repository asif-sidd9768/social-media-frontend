export const initialStatePost = {
  posts: [],
  exploreFeed: false,
  isLoading: true,
  error: null
}

export const postReducer = (state, action) => {
  switch(action.type){
    case "SET_POSTS":
      return {...state, posts:action.payload, isLoading: false}
    case "SET_POSTS_FAILURE":
      return {...state, error: action.payload, isLoading:false}
    case "ADD_POST":
      return {...state, posts: [action.payload, ...state.posts]}
    case "LIKE_POST":
      return {...state, posts: [action.payload, ...state.posts.filter(({id}) => id !== action.payload.id)]}
    case "TOGGLE_EXPLORE_FEED":
      return {...state, exploreFeed: !state.exploreFeed}

  }
}