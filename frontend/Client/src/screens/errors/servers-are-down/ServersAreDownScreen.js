import { Dimensions, StyleSheet, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const ServersAreDownScreen = () => {
  return (
    <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }}>
        <Text>
            <Ionicons
                name={"sad-outline"}
                size={windowHeight/4}
                color={"white"}
            />
        </Text>
        <Text style={{
            fontSize:30,
        }}>
            Thank You!
        </Text>
        <View style={{
            margin:10,
        }}>
            <Text>
                We really appriciate you using our application.
                
            </Text>
            <Text>
                Yet we are sorry to inform to you
            </Text>   
            <Text>
                Our Servers Are <Text style={{color:"red"}}>Down</Text> Right now, we could not provide our amazing services.
            </Text>  
            <Text>

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

export default ServersAreDownScreen;
