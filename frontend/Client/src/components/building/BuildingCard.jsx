
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
const afekaBuildingData = {
    id:'324324324343',
    status:'PRODUCTION',
    details:{
        title:'afeka',
        description:'afeka college',
        buildingType:'COLLEGE',
        address:'Mivtsa Kadesh St 38, Tel Aviv-Yafo, 6998812',
        openingHours:`
            Sunday	    9 am - 9 pm
            Monday	    9 am - 9 pm
            Tuesday	    9 am - 9 pm
            Wednesday	9 am - 9 pm
            Thursday	9 am - 9 pm
            Friday	    9 am - 1 pm
            Saturday	Closed
        `,
        websiteLink:`https://www.afeka.ac.il/`,
        phonenumbers:`03-768-8600`,
        buildingOpeningDate: new Date('1996-01-01')
    },
    geoArea:[
        {
            latitude:32.11346715888711,
            longitude:34.818165001968
        }, 
    ],
    entrances:[
        {
            title:'main-entrance',
            description:" afeka campus main entrance",
            isMain:true,
            isEmployeeOnly:false,
            isAvailable:true,
            geoTransitionArea:[
                {
                    latitude:32.11346715888711,
                    longitude:34.818165001968
                }
            ],
            doorGeoCoordinate:{
                direction:'NORTH',
                latitude:32.11346715888711,
                longitude:34.818165001968
            }

        },

    ]
   
}
const BuildingCard = ({building,onPress}) => {
    const onBuildingPress = () => {
        onPress&&onPress(building);
    }
    return (
        <TouchableOpacity style={styles.buildingCardContainer} onPress={onBuildingPress}>
            <View style={styles.buildingImageContainer}>
                <Text>
                    image
                </Text>
            </View>
            <View style={styles.buildingInformationContainer}>
                <View style={styles.buildingInformationHeader}>
                    <Text style={styles.buildingInformationHeaderText}>
                        {building.details.title}
                    </Text>
                </View>
                <View style={styles.buildingInformationBody}>
                    <Text style={styles.buildingInformationBodyText}>
                        address: {building.details.address}
                    </Text>
                    <Text style={styles.buildingInformationBodyText}>
                        city: {building.details.city}
                    </Text>
                    <Text style={styles.buildingInformationBodyText}>
                        zip code: {building.details.zipCode}
                    </Text>                                        
                </View>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buildingImageContainer:{
        marginHorizontal:10,
        borderColor:'lightgray',
        borderWidth:1,
        height:100,
        width:100,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        margin:5,
        alignSelf:'center'
    },
    buildingCardContainer:{
        //backgroundColor:'white'
        flexDirection:'row',
        borderWidth:0.5,
        borderColor:'lightgray',
        borderRadius:5,
        margin:10,

    },
    buildingInformationContainer:{
        flex:1,
    },
    buildingInformationHeader:{

    },
    buildingInformationHeaderText:{
        fontSize:25,
    },
    buildingInformationBody:{

    },
    buildingInformationBodyText:{

    }


})
export default BuildingCard;