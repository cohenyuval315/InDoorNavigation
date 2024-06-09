import { useNavigation } from '@react-navigation/native';
import GeoLocalization from './GeoLocalization';
import ScreenStreams from './ScreenStreams';
import { useEffect, useRef } from 'react';
const NavigationWrapper = ({children}) => {



    return (
        <GeoLocalization>
            <ScreenStreams>
                {children}  
            </ScreenStreams>
        </GeoLocalization>
    )
}
export default NavigationWrapper