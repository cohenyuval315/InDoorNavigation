import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { VolumeManager } from "react-native-volume-manager";

const AudioVolumeButton = () => {
    const [volume,setVolume] = useState(0);
    const [isMuted,setIsMuted] = useState(false);
    const iconSize = 20
    const iconColor = "black"
    
    const onPress = async () => {
        let newVolume = 0;
        if (isMuted){
            newVolume = 0.5;
        }
        await VolumeManager.setVolume(newVolume);
        setIsMuted(prev => !prev);
    }

    const getIconByVolume = () => {
        if (isMuted) {
            return <Ionicons name={"volume-mute"} size={iconSize} color={iconColor} />;
        } else {
            if (volume <= 0.33) {
                return <Ionicons name={"volume-low"} size={iconSize} color={iconColor} />;
            } else if (volumeLevel <= 0.66) {
                return <Ionicons name={"volume-medium"} size={iconSize} color={iconColor} />;
            } else {
                return <Ionicons name={"volume-high"} size={iconSize} color={iconColor} />;
            }
        }
    };
    useEffect(()=>{
        const volumeListener = VolumeManager.addVolumeListener((result) => {
            console.log(result.volume);
            setVolume(result.volume)
          });
        return () => {
            volumeListener.remove();
        }

    },[])
    return (
        <TouchableOpacity
        onPress={onPress}
        style={{
            position:"absolute",
            right:"3%",
            bottom:"70%",
            padding:10,
            borderRadius:50,
            backgroundColor:"lightblue"                
        }}>
            <Text style={{ color: "black" }}>{getIconByVolume()}</Text>
            
        </TouchableOpacity>  
    )
}
export default AudioVolumeButton;