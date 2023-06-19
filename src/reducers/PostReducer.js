export const initialStatePost = {
  posts: [],
  isLoading: true,
  error: null
}

export const postReducer = (state, action) => {
  switch(action.type){
    case "SET_POSTS":
      return {...state, posts:action.payload, isLoading: false}
    case "SET_POSTS_FAILURE":
      return {...state, error: action.payload, isLoading:false}
  }
}