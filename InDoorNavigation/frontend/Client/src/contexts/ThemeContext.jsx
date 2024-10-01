import React,{useContext, useEffect, useState} from "react";
import { AppThemes, getThemeByTitle } from '../styles/themes'
import AsyncStorage from '@react-native-async-storage/async-storage';



export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {  
    const [theme,setTheme] = useState(null);
    const [themeTitle,setThemeTitle] = useState(AppThemes.DARK);
    const [loadingTheme,setLoadingTheme] = useState(true);
    const themeStorageKey = "theme";

    async function getThemeFromLocalStorage(){
      return await AsyncStorage.getItem(themeStorageKey);
    }


    async function loadInitialTheme(){
      setLoadingTheme(true);
      const storageTheme = await getThemeFromLocalStorage();
      if(storageTheme && Object.values(AppThemes).includes(storageTheme)){
          setThemeTitle(storageTheme)
          setTheme(getThemeByTitle(storageTheme));
      }else{
        await updateLocalStorage(AppThemes.DARK)
        setThemeTitle(AppThemes.DARK);
        setTheme(getThemeByTitle(AppThemes.DARK));
      }
      setLoadingTheme(false);
    }


    const handleOnThemeChange = async (theme) => {
      setLoadingTheme(true);
      if (Object.values(AppThemes).includes(theme)) {
        const response = await updateLocalStorage(theme);
        if (response){
          setTheme(getThemeByTitle(theme))
        }else{
          console.error("fail to apply theme...");  
        }
      }else{
        console.error("theme does not exists...");
      }
      setLoadingTheme(false);
    }

    async function updateLocalStorage(theme){
      try{
        await AsyncStorage.setItem(themeStorageKey, theme)
        return true;
      }catch(error){
        return false;
      }
    }
  
    return (
      <ThemeContext.Provider
      value={{
        theme,
        loadingTheme,
        handleOnThemeChange,
        loadInitialTheme
      }}
       theme={theme}>
        { children }
      </ThemeContext.Provider>
    )
  
}

export const  useTheme = () => {
    return useContext(ThemeContext);
};
  
