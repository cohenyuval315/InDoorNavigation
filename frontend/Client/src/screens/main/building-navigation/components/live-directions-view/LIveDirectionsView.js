import { View ,Text, StyleSheet} from "react-native"
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

const LiveDirectionsView = ({direction="turn right",icon="arrow-right", timeLength=30,distance=10}) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapperContainer}>
                <FontAwesome5Icons name={icon} size={24} color="white" style={styles.icon} />
                
            
            <View style={styles.mapContainer}>
                <Text style={styles.mapText}>after {distance} meters please</Text>
                <Text style={styles.mapText}>{direction}</Text>
                <Text style={styles.mapText2}>(around {timeLength} seconds)</Text>

            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      position:"absolute",
      zIndex:999,
      width:"100%",
    //   backgroundColor: '#f5f5f5',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    wrapperContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        padding:20,
    },


    mapContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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