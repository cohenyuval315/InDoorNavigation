import React,{useContext, useState} from "react";

export const AppDataContext = React.createContext();

export const AppDataProvider = ({ children }) => {
    return (
      <AppDataContext.Provider
      value={{
 
      }}>
        { children }
      </AppDataContext.Provider>
    )
  
}

export const useAppData = () => {
    return useContext(AppDataContext);
};
  
