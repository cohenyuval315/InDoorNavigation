import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AppDataProvider } from "./AppDataContext";
import { SetupProvider } from "./SetupContext";
import {ThemeProvider} from "./ThemeContext";
import { UserProvider } from "./UserContext";
import ModalsProviders from "./ModalsProviders";
import DataProviders from "./DataProviders";
import { AppStateProvider } from "./AppStateContext";

const AppProviders = ({children}) => {
    return (
        <ThemeProvider>
            <ModalsProviders>
                <SetupProvider>
                    <AppStateProvider>
                        <UserProvider>
                            <AppDataProvider>
                                <BottomSheetModalProvider>
                                    <DataProviders>
                                        {children}
                                    </DataProviders>
                                </BottomSheetModalProvider>
                            </AppDataProvider>
                        </UserProvider>
                    </AppStateProvider>
                </SetupProvider>
            </ModalsProviders>
        </ThemeProvider>
    )
}

export default AppProviders;