import { View ,Text, StyleSheet} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';

const LiveDirectionsView = ({direction="turn right",icon="arrow-right", timeLength=30,distance=10}) => {
  const iconSize = 50;
    return (
        <View style={styles.container}>
            <View style={styles.wrapperContainer}>

              <View style={styles.placeholder}></View>

              <View style={styles.mapContainer}>
                  <Text style={styles.mapText}>after {distance} meters please</Text>
                  <Text style={styles.mapText}>{direction}</Text>
                  <Text style={styles.mapText2}>(around {timeLength} seconds)</Text>
              </View>
              
              <View style={styles.iconContainer}>
                <Icon name={icon} size={iconSize} color="white" style={styles.icon} />
              </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    //   backgroundColor: '#f5f5f5',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },

    wrapperContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        padding:"5%",
    },
    placeholder:{
      flex:1,
    },
    iconContainer:{
      // justifyContent:"center",
      alignItems:"center",
      flex:2,
      // backgroundColor:"red",
      
    },
    mapContainer: {
      flex:3,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor:"blue"
    },
    mapText: {
      fontSize: 16,
      color: 'white',
    },
    mapText2: {
        fontSize: 14,
        color: 'white',
      },
  });

  
export default LiveDirectionsView