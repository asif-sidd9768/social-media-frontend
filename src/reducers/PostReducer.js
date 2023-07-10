export const initialStatePost = {
  posts: [],
  exploreFeed: localStorage.getItem("exploreFeed") || "no",
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
  },
  newComment: "",
  addingPost: false,
  showEmoji: false
}

export const postReducer = (state, action) => {
  switch(action.type){
    case "POST_LOADING_STATE":
      return {...state, isLoading: true}
    case "POST_LOADING_FAILURE":
      return {...state, error:action.payload, isLoading: false}
    case "SET_POSTS":
      return {...state, posts:action.payload, isLoading: false}
    case "UPDATE_PAGE":
      return {...state, page: state.page+1}
    case "SET_POSTS_FAILURE":
      return {...state, error: action.payload, isLoading:false}
    case "ADD_POST":
      return {...state, posts: [action.payload, ...state.posts], isLoading: false}
    case "LIKE_POST":
      return {...state, posts: [action.payload, ...state.posts.filter(({id}) => id !== action.payload.id)], isLoading: false}
    case "DISLIKE_POST":{
      const updatedPostAfterDislike = state.posts.map((post) => post.id === action.payload.id ? action.payload : post)
      return {...state, posts: updatedPostAfterDislike, isLoading: false}
    }
    case "TOGGLE_EXPLORE_FEED":
      return {...state, exploreFeed: action.payload}
    case "EDIT_POST":{
      const updatedPosts = state.posts.map(post => post.id === action.payload.id ? action.payload : post)
      return {...state, posts: updatedPosts, isLoading: false}
    }
    case "DELETE_POST": {
      const updatedPostsAfterDelete = state.posts.filter(({id}) => id !== action.payload)
      return {...state, posts: updatedPostsAfterDelete, isLoading: false}
    }
    case "TOGGLE_FILTER" :{
      return {...state, filters: {...state.filters, ...action.payload}}
    }
    case "CREATE_NEW_POST": {
      return {...state, newPost: {...state.newPost, ...action.payload}, isLoading: false}
    }
    case "CREATE_NEW_POST_EMPTY": {
      return {...state, newPost: {...initialStatePost.newPost}}
    }
    case "TOGGLE_EMOJI_PICKER":
      return {...state, showEmoji: action.payload}
    case "CREATE_NEW_COMMENT": {
      console.log(action.payload)
      return {...state, newComment: action.payload, isLoading: false}
    }
    case "ADDING_NEW_POST":
      return {...state, addingPost: action.payload, isLoading: false}
    case "INCREMENT_PAGE":
      return {...state, page: state.page + 1}
    default: 
      return {...state}
  }
}