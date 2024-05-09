import React,{useContext, useState} from "react";

export const SetupContext = React.createContext();

export const SetupProvider = ({ children }) => {
    return (
      <SetupContext.Provider
      value={{
 
      }}>
        { children }
      </SetupContext.Provider>
    )
  
}

export const useSetup = () => {
    return useContext(SetupContext);
};
  
