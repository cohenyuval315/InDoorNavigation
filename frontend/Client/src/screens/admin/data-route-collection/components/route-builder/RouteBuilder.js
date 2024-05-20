import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View,Modal, FlatList, ScrollView } from "react-native"
import POIsDropDown from "../../../components/POIs-dropdown"
import { useSelector } from "react-redux"
import { selectMapPOIs } from "../../../../../app/map/map-slice"

const RouteBuilderModal = ({visible,route,onChange,onClose}) => {
    const POIs = useSelector(selectMapPOIs);
    const [POI,setPOI] = useState(null);
    const onPOIChange = (value) => {
        setPOI(value)
    }
    const onReset = () => {
        onChange([])
    }
    const onAdd = () => {
        if(POI){
            const POIItem = POIs.filter((p) => p.id === POI)[0];
            onChange([...route,POIItem])
        }
    }
    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={{
                flex:1,
                backgroundColor:"white"
            }}>
                <POIsDropDown
                    onChange={onPOIChange}
                    val={POI}
                />
                <View style={{
                    flex:1,
                }}>
                    <FlatList
                        scrollEnabled
                        data={route}
                        renderItem={({item,index}) => {
                            return (
                                <View>
                                    <Text style={{
                                        color:"black"
                                    }}>
                                        {item.details.title}
                                    </Text>
                                </View>
                            )
                        }}
                        keyExtractor={(item,index) => `${item.id.toString()}_${index}`}
                    />
                </View>
                <View>
                    <TouchableOpacity style={{
                        backgroundColor:"lightgreen",
                        padding:20,
                    }} onPress={onAdd}>
                        <Text style={{
                            color:"black",
                            textAlign:"center",
                        }}>
                            Add
                        </Text>
                    </TouchableOpacity>                        
                    <TouchableOpacity style={{
                        backgroundColor:"red",
                        padding:20,
                    }} onPress={onReset}>
                        <Text style={{
                            color:"black",
                            textAlign:"center",
                        }}>
                            Reset
                        </Text>
                    </TouchableOpacity>                    
                    <TouchableOpacity style={{
                        backgroundColor:"lightgray",
                        padding:20,
                    }} onPress={onClose}>
                        <Text style={{
                            color:"black",
                            textAlign:"center",
                        }}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const RouteBuilder = ({route,onChange}) => {
    const [visible,setVisible] = useState(false)
    const onPress = () => {
        setVisible(true);
    }
    const onClose= () => {
        setVisible(false);
    }
    return (
        <View style={{
            flex:1,
            flexDirection:"row"
        }}>
            <TouchableOpacity onPress={onPress} style={{
                backgroundColor:'red',
                justifyContent:"center",
                padding:20,
            }}>
                <Text style={{
                    color:"black",
                    fontSize:16,
                }}>
                    Build Path
                </Text>
            </TouchableOpacity>
            <ScrollView nestedScrollEnabled style={{
                height:50,
            }}>
                <View style={{
                    flex:1,
                    flexWrap:"wrap",
                    width:"100%",
                    justifyContent:"center",
                    alignItems: 'flex-start',
                    flexDirection:"row",
                }}>
                    {route.length == 0 && (
                        <Text style={{
                            color:"black",
                            textAlignVertical:"center",
                            textAlign:'center'
                        }}>
                            Nothing yet
                        </Text>
                    )}
                    {route.map((item,index) => {
                        const mapAreaString = item.mapArea.map(({ floor, x, y }) => {
                            return `(${x.toFixed(0)},${y.toFixed(0)})`;
                        }).join(', ');
                        return (
                            <View key={`item_${item.id.toString()}_${index}`} style={{
                                flexDirection:"row",
                                justifyContent:'center',
                                flexWrap:"wrap"
                                
                            }}>
                                <Text style={{
                                    color:"black"
                                }}>
                                    <View style={{
                                        borderRadius:30,
                                        backgroundColor:"blue",
                                        padding:0,
                                        paddingHorizontal:10,
                                    }}>
                                        <Text style={{
                                       
                                            textAlign:'center',
                                            textAlignVertical:'center'
                                        }}>
                                            {index}
                                        </Text>
                                    </View>
                                    <View style={{
                                        flex:1,
                                        flexDirection:"row",
                                        alignItems: 'flex-start',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        flexWrap:'wrap',
                                        width:"100%"

                                    }}>
                                        <Text style={{
                                            color:"black"
                                        }}>
                                        ({item.details.title},{item.floor},({mapAreaString}))

                                            {route.length - 1 > index && (
                                                <Text style={{
                                                    color:"black"
                                                }}>
                                                    {"-->"}
                                                </Text>
                                                
                                            )}
                                        </Text>
                                    </View>

                                    

                                </Text>
                            </View>
                        )
                    })}      
                </View>
            </ScrollView>

         
            <RouteBuilderModal
                onChange={onChange}
                onClose={onClose}
                route={route}
                visible={visible}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default RouteBuilder