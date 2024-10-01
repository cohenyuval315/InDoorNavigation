import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

const userSVGWithPoint = `
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<g>
    <g>
        <polygon points="32,0 46,32 60,64 32,50 4,64 18,32" fill="gray"/>
        <!-- Circle added at the center -->
        <circle cx="32" cy="32" r="3" fill="black"/>
    </g>
</g>
</svg>
`;

const userSVG = `
    <?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
    <g>
        <g>
            <polygon points="32,0 46,32 60,64 32,50 4,64 18,32" fill="#FF0000"/>
        </g>
    </g>
    </svg>
`;


const UserPointer = ({rotationRef,size,onPress,withPoint=false,opacity=1}) => {
    const handleOnPress = () => {
        onPress && onPress();
    }
    
    const rotation = rotationRef.current.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    const svg = withPoint ? userSVGWithPoint : userSVG;
    return (
        <Animated.View style={[{
            transform: [{ rotate: rotation }],
            opacity:opacity,
        },styles.container]}>
            <TouchableOpacity 
                style={styles.svgContainer}  
                activeOpacity={onPress ? 0.2 : 1} 
                onPress={handleOnPress}
            >
                <SvgXml
                    xml={svg}
                    width={size}
                    height={size}
                />
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        pointerEvents:'box-none',
        justifyContent:'center',
        alignItems:'center'
    },
    svgContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
    },
})

export default UserPointer;