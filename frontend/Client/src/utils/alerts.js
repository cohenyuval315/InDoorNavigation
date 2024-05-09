import { Alert } from "react-native";


export const showError = (message) => {
    Alert.alert(
        "Error",
        message,
      [
        { text: 'OK', onPress: () => {}}
      ],
      { cancelable: false }
    );
};