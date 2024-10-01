import { Dimensions, StyleSheet, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const DenyContractScreen = ({onAccept,onDeny}) => {
  return (
    <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }}>
        <Text>
            <Ionicons
                name={"skull-outline"}
                size={windowHeight/4}
                color={"white"}
            />
        </Text>
        <Text style={{
            fontSize:30,
        }}>
           Your Dead!
        </Text>
        <View style={{
            margin:10,
        }}>
            <Text>
                This is a cursed Screen, you better accept our terms
            </Text>
            <Text>
                Restart The Contract Again
            </Text>
        </View>
                                      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:20,
    
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color:"black"
  },
});

export default DenyContractScreen;
