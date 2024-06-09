import { GPSProvider } from "./GPSContext";



const DataProviders = ({children}) => {
    return (
        <GPSProvider>
            {children}
        </GPSProvider>
    )
}

export default DataProviders;