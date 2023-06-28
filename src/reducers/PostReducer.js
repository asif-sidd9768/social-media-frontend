export const initialStatePost = {
  posts: [],
  exploreFeed: "no",
  isLoading: true,
  error: null,
  page: 1,
  filters: {
    sortType: "newest"
  },
  popups: {
    feedImage: null
  },
  newPost: {
    content: "",
    selectedImage: null
  }
}

export const postReducer = (state, action) => {
  switch(action.type){
    case "SET_POSTS":
      return {...state, posts:action.payload, isLoading: false}
    case "UPDATE_PAGE":
      return {...state, page: state.page+1}
    case "SET_POSTS_FAILURE":
      return {...state, error: action.payload, isLoading:false}
    case "ADD_POST":
      return {...state, posts: [action.payload, ...state.posts]}
    case "LIKE_POST":
      return {...state, posts: [action.payload, ...state.posts.filter(({id}) => id !== action.payload.id)]}
    case "DISLIKE_POST":{
      const updatedPostAfterDislike = state.posts.map((post) => post.id === action.payload.id ? action.payload : post)
      return {...state, posts: updatedPostAfterDislike}
    }
    case "TOGGLE_EXPLORE_FEED":
      return {...state, exploreFeed: action.payload}
    case "EDIT_POST":{
      const updatedPosts = state.posts.map(post => post.id === action.payload.id ? action.payload : post)
      return {...state, posts: updatedPosts}
    }
    case "DELETE_POST": {
      const updatedPostsAfterDelete = state.posts.filter(({id}) => id !== action.payload)
      return {...state, posts: updatedPostsAfterDelete}
    }
    case "TOGGLE_FILTER" :{
      console.log(action.payload)
      return {...state, filters: {...state.filters, ...action.payload}}
    }
    case "CREATE_NEW_POST": {
      return {...state, newPost: {...state.newPost, ...action.payload}}
    }
    case "CREATE_NEW_POST_EMPTY": {
      return {...state, newPost: {...initialStatePost.newPost}}
    }
  }
}