import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestContractStatus(){
    try {
        return await AsyncStorage.getItem('status');
    } catch(e) {
        console.error(e,'error occured getting contract status from async storage');
    }      
    
}

export async function acceptContract(){
    try {
        await AsyncStorage.setItem('status', 'true')
    } catch(e) {
        console.error(e,'error occured during contract status acceptance');
    }    
}