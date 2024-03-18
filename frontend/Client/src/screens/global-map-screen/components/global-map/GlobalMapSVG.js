import { View,StyleSheet } from "react-native";
import { israelLocationMapSVG } from "../../../../static-maps/israel/IsraelSVGMap";
import { SvgXml } from "react-native-svg";

const GlobalMapSVG = ({xml}) => {
    return (
      <View style={styles.container}>
        <SvgXml 
            xml={xml}
            width={"100%"}
            height={"100%"}
        >
        </SvgXml>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container:{
      flex:1,
    }
  })

export default GlobalMapSVG;