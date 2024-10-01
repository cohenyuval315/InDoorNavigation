import React,{useContext, useState} from "react";

export const AppBootContext = React.createContext();

export const AppBootProvider = ({ children }) => {
    const [isSuccess,setIsSuccess] = useState(null);


    const success = () => {
      setIsSuccess(true);
    }
    const failure = () => {
      setIsSuccess(false);
    }

    return (
      <AppBootContext.Provider
      value={{
        isSuccess,
        success,
        failure,
      }}>
        { children }
      </AppBootContext.Provider>
    )
  
}

export const useAppBoot = () => {
    return useContext(AppBootContext);
};
  
