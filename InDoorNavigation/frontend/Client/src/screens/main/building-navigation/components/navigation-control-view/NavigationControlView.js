import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const NavigationControlView = ({timeLeft = 0,distanceLeft = 0}) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); // Update time every second
    
        return () => clearInterval(timer); // Clean up the timer on component unmount
      }, []);

      const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };

    return (
        <View style={{
            justifyContent:"center",
            alignItems:"center",
            flex:1,
            
        }}>

            <View style={{
                flex:1,
                width:'50%',
                justifyContent:"center",
                alignItems:"center",
                paddingHorizontal:20,
                borderRadius:10,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                paddingVertical:10,
                
            }}>
                <View>
                    <Text style={{
                        fontSize: 24,
                        color:"white",
                        fontWeight: 'bold',
                    }}>{formatTime(currentTime)}</Text>
                </View>

            
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:"100%",
                }}>
                    <Text style={{
                        color:"white"
                    }}>
                        {timeLeft} min
                    </Text>

                    <Text style={{
                        color:"white"
                    }}>
                        {distanceLeft} meters
                    </Text>
                </View>
            </View>

        </View>
        
    )
}

export default NavigationControlView;