import React,{useContext, useState} from "react";
import MessageModal from "../components/general/modals/messages";


export const MessageModalContext = React.createContext();

export const MessageModalProvider = ({ children }) => {

    const [context, setContext] = useState({
        isOpen: false,
        title: "",
        message: "",
        headerColor:null,
        headerBackgroundColor:null,
        onClose: () => {},
        onOk: () => {},
    });

    const openMessage = (title,message,onClose=null,onOk=null,headerColor=null,headerBackgroundColor=null) => {
        setContext({
            isOpen: true,
            title: title,
            message: message,
            onClose: () => {
                closeMessage()
                onClose && onClose()
            },
            onOk: () => {
                closeMessage()
                onOk && onOk()
            },
            headerColor:headerColor,
            headerBackgroundColor:headerBackgroundColor
        })
    }

    const closeMessage = () => {
        setContext({
            isOpen: false,
            title: "",
            message: "",  
            onClose: () => {},
            onOk:()=>{},
            headerColor:null,
            headerBackgroundColor:null,
                          
        })
    }

    return (
      <MessageModalContext.Provider
      value={{  
        openMessage
      }}>
        { children }

        <MessageModal
            message={context.message}
            onClose={context.onClose}
            onOk={context.onOk}
            title={context.title}
            visible={context.isOpen}
            headerBackgroundColor={context.headerBackgroundColor}
            headerColor={context.headerColor}
            // key={`${context.message}`}
        />
      </MessageModalContext.Provider>
    )
  
}

export const useMessageModal = () => {
    return useContext(MessageModalContext);
};
  
