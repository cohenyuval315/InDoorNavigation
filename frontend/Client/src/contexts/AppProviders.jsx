/* eslint-disable prettier/prettier */
import { AppDataProvider } from "./AppDataContext";
import {ThemeProvider} from "./ThemeContext";

const AppProviders = ({children}) => {
    return (
        <ThemeProvider>
            <AppDataProvider>
                {children}
            </AppDataProvider>
        </ThemeProvider>
    )
}

export default AppProviders;