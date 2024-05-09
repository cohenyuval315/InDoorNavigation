import { Dimensions, StyleSheet, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const UnknownErrorScreen = ({error}) => {
  return (
    <View>
        <Text>
            what the hell
            error: {error}
        </Text>                        
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

export default UnknownErrorScreen;
