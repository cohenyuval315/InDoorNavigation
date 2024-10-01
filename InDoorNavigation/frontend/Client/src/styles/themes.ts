import { DefaultTheme } from "@react-navigation/native";
import { themeConstants } from "./constant";
import { DarkTheme } from "./dark";
import {LightTheme} from "./light";

// 60 30 10
// cover your room with 60% of a dominant color,
// 30% of a secondary color, and 10% of an accent shade


// REACT NATIVE NAVIGATION Theme colors
// dark: boolean;
// colors: {
//   primary: string;
//   background: string;
//   card: string;
//   text: string;
//   border: string;
//   notification: string;
// };



export enum AppThemes {
   DARK = "Dark",
   LIGHT = "Light"
}

export const getThemeByTitle = (themeName:AppThemes | undefined) => {
   let selectedTheme = null
   switch(themeName){
      case AppThemes.DARK:{
         selectedTheme = DarkTheme;
         break;
      }
      case AppThemes.LIGHT:{
         selectedTheme = LightTheme;
         break;
      }
      default:{
         console.log("No Selected Theme - using default Light Theme")
         selectedTheme = LightTheme;
         break;
      }
   }
   const combinedTheme =  {
      ...DefaultTheme,
      ...themeConstants,
      ...selectedTheme
   }

   return combinedTheme;
}

