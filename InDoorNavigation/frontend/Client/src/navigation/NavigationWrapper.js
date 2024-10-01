import { useNavigation } from '@react-navigation/native';
import LeftDrawer from '../layouts/left-drawer';
import useInternetConnection from '../hooks/useInternetConnection';

const NavigationWrapper = ({children}) => {
    const navigation = useNavigation();
    const {} = useInternetConnection(onNoConnection,null,null);

    const onNoConnection = () => {
      navigation.navigate("no-internet");
    }
      
    return (
        <LeftDrawer>
            {children}  
        </LeftDrawer>
    )
}
export default NavigationWrapper