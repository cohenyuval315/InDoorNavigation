import React,{useContext, useState} from "react";
import ConfirmationModal from "../components/general/modals/confirmation";
import { generateUUID } from "../utils/id/uuid";

export const LoadingMessagesContext = React.createContext();

export const LoadingMessagesProvider = ({ children }) => {
    const [loadingMessages,setLoadingMessages] = useState([]);
    
    const addLoadingMessage = (message) => {
        const messageId = generateUUID();
        let isAdded = false; 

        const existingSameMessages = [...loadingMessages.filter((m,index) => m.message === message)];
        if (existingSameMessages.length > 0){
          return 
        }

        const updatedMessages = [...loadingMessages,{
          messageId:messageId,
          message:message
        }]
        
        setLoadingMessages(prev => updatedMessages);

        if(isAdded){
          return () => removeLoadingMessage(messageId);
        }else{
          return () => {}
        }
    };

    const addLoadingMessageId = (message) => {
      const messageId = generateUUID();
      let isAdded = false; 

      const existingSameMessages = [...loadingMessages.filter((m,index) => m.message === message)];
      if (existingSameMessages.length > 0){
        return 
      }

      const updatedMessages = [...loadingMessages,{
        messageId:messageId,
        message:message
      }]
      
      setLoadingMessages(prev => updatedMessages);

      if(isAdded){
        return messageId;
      }else{
        return null;
      }
  };


    const removeLoadingMessage = (messageId) => {
      const updatedMessages = [...loadingMessages.filter((m) => m.messageId !== messageId)];
      setLoadingMessages(prev => updatedMessages);
    }
    const resetLoadingMessage = () => {
      setLoadingMessages(prev => []);
    }

    return (
      <LoadingMessagesContext.Provider
      value={{  
        loadingMessages,
        addLoadingMessage,
        resetLoadingMessage,
        removeLoadingMessage,
        addLoadingMessageId
      }}>
        {children}
        
      </LoadingMessagesContext.Provider>
    )
  
}

export const useLoadingMessagesContext = () => {
    return useContext(LoadingMessagesContext);
}
  
