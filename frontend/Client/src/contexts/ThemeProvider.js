/* eslint-disable prettier/prettier */
import React,{useContext, useState} from "react";
import { LightTheme, DarkTheme } from '../styles/Themes'

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {  
    const [theme,setTheme] = useState(DarkTheme);

    const updateTheme = (theme) => {
      setTheme(theme);
    }
    const toggleTheme = () => {
      if (theme.key === DarkTheme.key){
        setTheme(LightTheme)
      }else{
        setTheme(DarkTheme)
      }
    }
  
    return (
      <ThemeContext.Provider
      value={{
        theme,
        updateTheme,
        toggleTheme,
      }}
       theme={theme}>
        { children }
      </ThemeContext.Provider>
    )
  
}

export const useTheme = () => {
    return useContext(ThemeContext);
};
  
