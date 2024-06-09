import { ConfirmationModalProvider } from "./ConfirmationModalContext";
import { LoadingMessagesProvider } from "./LoadingMessagesContext";

const ModalsProviders = ({children}) => {
    return (
        <LoadingMessagesProvider>
            <ConfirmationModalProvider>
                {children}
            </ConfirmationModalProvider>
        </LoadingMessagesProvider>
    )
}

export default ModalsProviders;