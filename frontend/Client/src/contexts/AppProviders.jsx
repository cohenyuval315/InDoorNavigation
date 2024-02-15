/* eslint-disable prettier/prettier */
import {ThemeProvider} from "./ThemeProvider";


const AppProviders = ({children}) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}

export default AppProviders;