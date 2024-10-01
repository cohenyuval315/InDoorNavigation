import { Linking,Platform } from "react-native";

export const openMap = async (country:string, state:string, city:string, street:string, streetNumber:string | number, postalCode:string | number) => {
    const address = `${street} ${streetNumber}`;
    const destination = encodeURIComponent(`${address}, ${city}, ${state}, ${country} ${postalCode}`);
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