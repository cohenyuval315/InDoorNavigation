import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Drawer } from 'react-native-drawer-layout';
import { useDrawer } from '../../contexts/DrawerContext';
import DrawerContent from './DrawerContent';
import { useAppBoot } from '../../contexts/AppBootContext';


const LeftDrawer = ({children}) => {
    const {isOpen,toggle,open,close} = useDrawer();
    const {isSuccess} = useAppBoot()
    
    return (
        <Drawer
            open={isSuccess ? isOpen : false}
            onOpen={open}
            onClose={close}
            renderDrawerContent={() => {
                return <DrawerContent/>
            }}
            drawerPosition={"left"}
            drawerType={"front"}
            drawerStyle={{
                flex:1,
            }}
            gestureHandlerProps={{
                enabled:true,
            }}
            
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    {children}
                </View>
                {isSuccess && (
                    <TouchableOpacity style={styles.drawerButton} onPress={toggle}>
                        <Icon name={"menu"} size={30} color="#333" />
                    </TouchableOpacity>
                )}
            </View>

        </Drawer>
    )
}
 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:"transparent",
        pointerEvents:"box-none",
        // width:"100%",
        // height:"100%"
    },
    content: {
        flex: 1,
    },
    drawerButton: {
        position: 'absolute',
        top: 10,
        left: 16,
        zIndex: 9990, 
        borderRadius:30,
        padding:5,
        backgroundColor:"lightgray",
    },
});

export default LeftDrawer;