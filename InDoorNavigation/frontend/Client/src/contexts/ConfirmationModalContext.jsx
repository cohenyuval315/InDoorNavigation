import React,{useContext, useState} from "react";
import ConfirmationModal from "../components/general/modals/confirmation";

export const ConfirmationModalContext = React.createContext();

export const ConfirmationModalProvider = ({ children }) => {

    const [context, setContext] = useState({
        isOpen: false,
        title: "",
        message: "",
        onClose: () => {},
        onConfirm: () => {},
        onCancel: () => {},
    });

    const openConfirm = (title,message,onConfirm=null,onClose=null,onCancel=null) => {
        setContext({
            isOpen: true,
            title: title,
            message: message,
            onClose: () => {
                closeConfirm()
                onClose && onClose()
            },
            onConfirm: () => {
                closeConfirm()
                onConfirm && onConfirm()
            },
            onCancel: () => {
                closeConfirm()
                onCancel && onCancel()
            }
        })
    }

    const closeConfirm = () => {
        setContext({
            isOpen: false,
            title: "",
            message: "",  
            onClose: () => {},
            onConfirm: () => {},
            onCancel: () => {},                      
        })
    }

    return (
      <ConfirmationModalContext.Provider
      value={{  
        openConfirm
      }}>
        { children }
        <ConfirmationModal 
            visible={context.isOpen}
            message={context.message} 
            onCancel={context.onCancel} 
            onClose={context.onClose} 
            onConfirm={context.onConfirm}
            title={context.title}
        >

        </ConfirmationModal>
        
      </ConfirmationModalContext.Provider>
    )
  
}

export const useConfirmationModal = () => {
    return useContext(ConfirmationModalContext);
};
  
