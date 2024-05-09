import { View,StyleSheet } from "react-native";
import { israelLocationMapSVG } from "../../../../static-maps/israel/IsraelSVGMap";
import { SvgXml } from "react-native-svg";
import { memo } from "react";


const GlobalMapSVG = memo(({xml,width="100%",height="100%"}) => {
    return (
      <View style={styles.container}>
        <SvgXml 
            style={{
            }}
            xml={xml}
            width={width}
            height={height}
        >
        </SvgXml>
      </View>
    );
  });

  const styles = StyleSheet.create({
    container:{
      flex:1,
    }
  })

export default GlobalMapSVG;