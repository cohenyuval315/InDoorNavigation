/* eslint-disable prettier/prettier */
import { Linking,Platform } from "react-native";

export const openMap = async (address, city, zipCode) => {
    const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`);  
    const provider = Platform.OS === 'ios' ? 'apple' : 'google'
    const link = `http://maps.${provider}.com/?daddr=${destination}`;
    try {
        const supported = await Linking.canOpenURL(link);
        if (supported) {
            Linking.openURL(link);
            return true;
        }else{
            return false;
        }
    } catch (error) {
        
    }
}

export const isMapServiceAvailable = async () => {
    const provider = Platform.OS === 'ios' ? 'apple' : 'google'
    const link = `http://maps.${provider}.com/`;
    const isSupported = await Linking.canOpenURL(link);
    if (isSupported){
        return true;
    }
    return false;
}