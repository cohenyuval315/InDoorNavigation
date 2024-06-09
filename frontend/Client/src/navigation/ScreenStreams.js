import { useNavigation,useNavigationState } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { start } from "../services/sensors/rnsensors";


const ScreenStreams = ({children}) => {
    const navigation = useNavigation()
    const currentRoute = useRef(null);

    const streamsByScreen = (route) => {
        switch(route){
            
        }

    }
    
    useEffect(() => {
        if (navigation && navigation.getCurrentRoute){
            const current = navigation.getCurrentRoute();
            if (current && current.name){
                if (currentRoute.current != current.name){
                    streamsByScreen(current.name)
                }
                currentRoute.current = current.name;
            }
        }
    },[currentRoute.current])



    return children;
}

export default ScreenStreams