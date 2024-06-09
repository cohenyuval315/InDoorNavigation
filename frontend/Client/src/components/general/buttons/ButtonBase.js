const { TouchableOpacity, Text } = require("react-native");

const ButtonBase = ({onButtonPress,activeOpacity=undefined, styles={}}) => {
    const {theme} = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={onButtonPress || null}
            style={{
                padding:10,
                borderRadius:30,
                backgroundColor:"lightblue",
                ...styles
            }}>
            <Text style={{

            }}>
                {children}
            </Text>
        </TouchableOpacity>  
    )
}

export default ButtonBase;