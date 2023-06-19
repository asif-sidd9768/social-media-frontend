import { createContext, useReducer } from "react";
import { initialStateTheme, themeReducer } from "../reducers/ThemeReducer";

export const ThemeContext = createContext()
export const ThemeProvider = ({children}) => {
  const [themeState, themeDispatch] = useReducer(themeReducer, initialStateTheme)
  return (
    <ThemeContext.Provider value={{themeState, themeDispatch}}>
      {children}
    </ThemeContext.Provider>
  )
}