import { ScrollView, Text, View } from "react-native"
import DataCollectorScreen from "./DataCollectorScreen"
import SensorView from "../../../components/sensors/data-view/SensorView"

const Sensors = () => {
    const axis = ["x", "y", "z"];

    const availableSensors = {
      accelerometer: axis,
      gyroscope: axis,
      magnetometer: axis,
    //   barometer: ["pressure"],
    };
  
    return (
      <View>
        {Object.entries(availableSensors).map(([name, values]) => (
          <SensorView key={name} sensorName={name} values={values} />
        ))}
      </View>
    );
}

const DataScreen = () =>{
    return (
        <ScrollView style={{
            flex:1,
            backgroundColor:"black"
        }}>
            <Text style={{
                color:"black"
            }}>
                hello
            </Text>
            <DataCollectorScreen/>
            <View style={{
                zIndex:-1
            }}>
                <Sensors/>
            </View>
            19/4 
        </ScrollView>
    )
}
export default DataScreen