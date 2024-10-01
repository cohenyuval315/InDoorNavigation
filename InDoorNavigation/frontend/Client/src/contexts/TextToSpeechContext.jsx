import React,{useContext, useState} from "react";

export const TextToSpeechContext = React.createContext();

export const TextToSpeechProvider = ({ children }) => {

    return (
      <TextToSpeechContext.Provider
      value={{
        
      }}>
        { children }
      </TextToSpeechContext.Provider>
    )
  
}

export const useTTS = () => {
    return useContext(TextToSpeechContext);
};
  
