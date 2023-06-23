export const initialStateProfile = {
  isProfileEditing: false,
  editedFields: {
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
    url: ""
  }
}

export const profileReducer = (state, action) => {
  switch(action.type){
    case "SET_EDITED_FIELDS":
      return {...state, editedFields: {...action.payload}}
  }
}