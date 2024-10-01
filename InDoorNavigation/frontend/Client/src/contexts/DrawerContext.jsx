import React,{useContext, useState} from "react";

export const DrawerContext = React.createContext();

export const DrawerProvider = ({ children }) => {
    const [isOpen,setIsOpen] = useState(false);

    const toggle = ()  => {
        setIsOpen(prev => !prev);
    }

    const close = () => {
        setIsOpen(false);
    }
    const open = () => {
        setIsOpen(true);
    }

    return (
      <DrawerContext.Provider
      value={{
        isOpen,
        toggle,
        close,
        open
      }}>
        { children }
      </DrawerContext.Provider>
    )
  
}

export const useDrawer = () => {
    return useContext(DrawerContext);
};
  
