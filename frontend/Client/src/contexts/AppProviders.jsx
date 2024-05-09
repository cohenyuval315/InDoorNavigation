import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AppDataProvider } from "./AppDataContext";
import { SetupProvider } from "./SetupContext";
import {ThemeProvider} from "./ThemeContext";
import { UserProvider } from "./UserContext";

const AppProviders = ({children}) => {
    return (
        <ThemeProvider>
            <SetupProvider>
                <UserProvider>
                    <AppDataProvider>
                        <BottomSheetModalProvider>
                            {children}
                        </BottomSheetModalProvider>
                    </AppDataProvider>
                </UserProvider>
            </SetupProvider>
        </ThemeProvider>
    )
}

export default AppProviders;