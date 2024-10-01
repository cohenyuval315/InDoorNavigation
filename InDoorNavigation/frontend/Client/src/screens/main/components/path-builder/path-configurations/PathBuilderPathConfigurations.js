import { StyleSheet, Switch, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectActivePathConfig, setConfigElevators, setConfigInOrder, setConfigStairs } from "../../../../../../app/active/active-slice";

const PathBuilderPathConfigurations = () => {
    const dispatch = useDispatch();
    const activePathConfig = useSelector(selectActivePathConfig);
    const {
        inOrder,
        stairs,
        elevators,
    } = activePathConfig

    const handleOnInOrderChange = () => {
        dispatch(setConfigInOrder(!inOrder))
    }

    const handleOnStairsChange = () => {
        dispatch(setConfigStairs(!stairs))
    }

    const handleOnElevatorsChange = () => {
        dispatch(setConfigElevators(!elevators))
    }
    
    
    
    return (
        <View>
            <View style={{

            }}>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    padding:10
                }}>
                    <Text>
                        inOrdered
                    </Text>
                    <Switch value={inOrder} onChange={handleOnInOrderChange} />

                    <Text>
                        stairs
                    </Text>
                    <Switch value={stairs} onChange={handleOnStairsChange} />

                    <Text>
                        elevators
                    </Text>
                    <Switch value={elevators} onChange={handleOnElevatorsChange} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default PathBuilderPathConfigurations;