import { Text, TouchableOpacity, View } from "react-native";

const GeneralSettingsScreen = (props) => {
    return (
      <View>
        <TouchableOpacity 
        onPress={()=> props.navigation.navigate("GeneralLanguageSettings")}
        style={{
          backgroundColor:"blue",
          height:200
        }}>
          <Text>

          </Text>
        </TouchableOpacity>
      </View>
    );
  };

export default GeneralSettingsScreen