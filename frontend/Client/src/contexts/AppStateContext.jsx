import React,{useContext, useEffect, useState} from "react";
import { AppStateManager } from "../streams/app-state";

export const AppStateContext = React.createContext();

export const AppStateProvider = ({ children }) => {
    const [appState,setAppState] = useState();

    useEffect(() => {
        AppStateManager.getInstance().subscribe({
            next:(state) => {
                setAppState(state);
            }
        })
    },[])

    return (
      <AppStateContext.Provider
      value={{
        appState
      }}>
        { children }
      </AppStateContext.Provider>
    )
  
}

export const useAppState = () => {
    return useContext(AppStateContext);
};
  
