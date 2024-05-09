import React,{useContext, useEffect, useState} from "react";
import { LightTheme, DarkTheme, AppThemes, AppThemesValues, getTheme } from '../styles/themes'
import AsyncStorage from '@react-native-async-storage/async-storage';



export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {  
    const [theme,setTheme] = useState('Light');
    const [loadingTheme,setLoadingTheme] = useState(true);
    const themeStorageKey = "theme";

    async function getThemeFromLocalStorage(){
      return await AsyncStorage.getItem(themeStorageKey);
    }

    async function setThemeByName(theme){
      const themeStyles = getTheme(theme)
      setTheme(themeStyles);
      return themeStyles;
    }

    async function setInitialTheme(){
      setLoadingTheme(true);
      const storageTheme = await getThemeFromLocalStorage();
      let initialTheme = null;
      if(!storageTheme){
        console.log("No Initial Theme - using default Light Theme")
        initialTheme = AppThemes.LIGHT;
        await updateLocalStorage(AppThemes.LIGHT)
      }else{
        initialTheme = storageTheme;
      }
      setThemeByName(initialTheme);
      setLoadingTheme(false);
    }



    const handleOnThemeChange = async (theme) => {
      setLoadingTheme(true);
      if (AppThemesValues.includes(theme)) {
        const response = await updateLocalStorage(theme);
        if (response){
          setThemeByName(theme);
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
        setInitialTheme
      }}
       theme={theme}>
        { children }
      </ThemeContext.Provider>
    )
  
}

export const useTheme = () => {
    return useContext(ThemeContext);
};
  
