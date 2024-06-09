import React,{useContext, useState} from "react";
import ConfirmationModal from "../components/modals/confirmation";

export const LoadingMessagesContext = React.createContext();

export const LoadingMessagesProvider = ({ children }) => {
    const [loadingMessages,setLoadingMessages] = useState([]);

    const addLoadingMessage = (message) => {
        const messageIndex = loadingMessages.length; // Capture the index at the time of adding
        setLoadingMessages(prevMessages => [...prevMessages, message]);
        return () => removeLoadingMessage(messageIndex);
    };
    const removeLoadingMessage = (messageIndex) => {
        setLoadingMessages(prevMessages =>
            prevMessages.filter((_, i) => i !== messageIndex)
        );
    }

    return (
      <LoadingMessagesContext.Provider
      value={{  
        loadingMessages,
        addLoadingMessage
      }}>
        {children}
        
      </LoadingMessagesContext.Provider>
    )
  
}

export const useLoadingMessagesContext = () => {
    return useContext(LoadingMessagesContext);
}
  
