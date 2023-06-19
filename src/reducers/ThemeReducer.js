export const initialStateTheme = {
  currentTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
}

export const themeReducer = (state, action) => {
  switch(action.type){
    case "SWITCH_THEME": 
      return {...state, currentTheme: state.currentTheme === "light" ? "dark" : "light" }
  }
}