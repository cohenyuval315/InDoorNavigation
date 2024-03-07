import { Text, View,Linking,Platform, TouchableOpacity } from "react-native";
import { WebView } from 'react-native-webview';

const uri = 'https://reactnative.dev/'
const url = 'https://www.google.com/maps/place/Mivtsa+Kadesh+St+38,+Tel+Aviv-Jaffa/@32.1133608,34.8166401,17.41z/data=!4m10!1m2!2m1!1sMivtsa+Kadesh+St+38!3m6!1s0x151d49761debb9bb:0x84ec804dfe7da9e0!8m2!3d32.1134519!4d34.8181026!15sChNNaXZ0c2EgS2FkZXNoIFN0IDM4kgEQZ2VvY29kZWRfYWRkcmVzc-ABAA!16s%2Fg%2F11hdjcvwy6?entry=ttu';


const openMap = async (address, city, zipCode, ) => {
    const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`);  
    const provider = Platform.OS === 'ios' ? 'apple' : 'google'
    const link = `http://maps.${provider}.com/?daddr=${destination}`;

    try {
        const supported = await Linking.canOpenURL(link);

        if (supported) Linking.openURL(link);
    } catch (error) {
        console.log(error);
    }
}

const MyWebComponent = () => {
    const handleNavigation = () => {
        openGoogleMapsApp()
    }
    return (
        <WebView 
            originWhitelist={['*']} 
            source={{ 
                uri: url
            }} 
            style={{ flex: 1 }} 
            onShouldStartLoadWithRequest={handleNavigation}
            />
    )
  }
const GlobalMapScreen = () => {
    const onP = async () =>{
        await openMap('Mivtsa Kadesh St 38', 'Tel Aviv-Yafo', 6998812);
    }
    return (
        <View style={{
            flex:1,
        }}>
            {/* <MyWebComponent/> */}
            <TouchableOpacity onPress={onP}>
                <Text>
                    hel
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const openGoogleMapsApp = () => {
    const googleMapsUrl = 'comgooglemaps://';
    Linking.canOpenURL(googleMapsUrl).then((supported) => {
      if (supported) {
        Linking.openURL(googleMapsUrl);
      } else {
        console.log('Please Install Google Maps');
      }
    });
  };
export default GlobalMapScreen;