import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View,Modal, FlatList, ScrollView } from "react-native"
import POIsDropDown from "../../../components/POIs-dropdown"
import { useSelector } from "react-redux"
import { selectMapPOIs } from "../../../../../app/map/map-slice"
import { selectEdges, selectNodes } from "../../../../../app/admin/admin-slice"
import NodesDropdown from "../../../components/nodes-dropdown"
import EdgesDropdown from "../../../components/edges-dropdown"

const RouteBuilderModal = ({visible,route,onChange,onClose}) => {
    const nodes = useSelector(selectNodes);
    const edges = useSelector(selectEdges);
    const [node,setNode] = useState(null);
    const onNodeChange = (value) => {
        setNode(value)
    }
    
    const onReset = () => {
        onChange([])
    }

    const onNodeAdd = () => {
        if (node) {
          const nodeItem = nodes.find((p) => p.id === node);
          const isNodeInRoute = route.some((p) => p.id === node);

            if (isNodeInRoute) {
                console.log('Node is already in the route.');
                return;
            }
          if (route.length > 0) {
            const lastNode = route[route.length - 1].id;
            const hasEdge = edges.some(
              (edge) =>
                (edge.nodeA === lastNode && edge.nodeB === node) ||
                (edge.nodeA === node && edge.nodeB === lastNode)
            );
    
            if (hasEdge) {
              onChange([...route, nodeItem]);
            } else {
              // Optionally, notify the user that the node cannot be added
              console.log('No edge exists between the selected nodes.');
            }
          } else {
            // If the route is empty, add the first node
            onChange([...route, nodeItem]);
          }
        }
      };

    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={{
                flex:1,
                backgroundColor:"white"
            }}>
                <NodesDropdown
                    onChange={onNodeChange}
                    val={node}
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
                                        {item.title}
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
                    }} onPress={onNodeAdd}>
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
                        const { floor, x, y } = item.mapCoordinates;
                        const mapAreaString = `(${x.toFixed(0)},${y.toFixed(0)})`;

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
                                        ({item.title},{item.mapCoordinates.floor},({mapAreaString}))

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