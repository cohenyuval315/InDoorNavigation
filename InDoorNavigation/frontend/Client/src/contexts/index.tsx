import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "./ThemeContext";
import { DrawerProvider } from "./DrawerContext";
import { AppBootProvider } from "./AppBootContext";
import { ConfirmationModalProvider } from "./ConfirmationModalContext";
import { LoadingMessagesProvider } from "./LoadingMessagesContext";
import { MessageModalProvider } from "./MessageModalContext";
import { TextToSpeechProvider } from "./TextToSpeechContext";




const AppProviders = ({children}:{children:any}) => {
    return (
        <ThemeProvider>
            <LoadingMessagesProvider>
                <ConfirmationModalProvider>
                    <MessageModalProvider>
                        <AppBootProvider>
                            <DrawerProvider>
                                <BottomSheetModalProvider>
                                    <TextToSpeechProvider>
                                        {children}
                                    </TextToSpeechProvider>
                                </BottomSheetModalProvider>
                            </DrawerProvider>
                        </AppBootProvider>
                    </MessageModalProvider>
                </ConfirmationModalProvider>
            </LoadingMessagesProvider>
        </ThemeProvider>
    )
}

export default AppProviders;