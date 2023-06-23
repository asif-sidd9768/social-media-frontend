export const initialStatePost = {
  posts: [],
  exploreFeed: false,
  isLoading: true,
  error: null,
  filters: {
    showDate: "newest",
    showTrending: false
  }
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
    case "EDIT_POST":{
      const updatedPosts = state.posts.map(post => post.id === action.payload.id ? action.payload : post)
      return {...state, posts: updatedPosts}
    }
    case "DELETE_POST": {
      const updatedPostsAfterDelete = state.posts.filter(({id}) => id !== action.payload)
      return {...state, posts: updatedPostsAfterDelete}
    }
    case "TOGGLE_FILTER" :{
      return {...state, filters: {...state.filters, ...action.payload}}
    }
  }
}