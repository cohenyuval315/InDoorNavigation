import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/app/store';
import RootStackScreen from './src/screens/RootStackScreen';
import { requestPermissions } from './permissions';

import RNExitApp from 'react-native-exit-app';
import { requestContractStatus,acceptContract } from './contract';
import ContractComponent from './src/components/contract/ContractComponent';
import { BottomSheetProvider } from '@gorhom/bottom-sheet/lib/typescript/contexts';

function App(): JSX.Element {
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [loadingContract, setLoadingContract] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [hasAcceptedContract, setHasAcceptedContract] = useState(false);

  useEffect(() => {

    const checkPermissionStatus = async () => {
      setLoadingPermissions(true);
      try {
        const permissionStatus = await requestPermissions(); // Your custom function
        setHasPermission(permissionStatus);
        if (!permissionStatus){
          RNExitApp.exitApp();
        }
      } catch (error) {
        console.error('Error checking permission status:', error);
      }finally{
        setLoadingPermissions(false);
      }
      
    };

    checkPermissionStatus();
  }, []);
  
  useEffect(() => {
    const checkContractStatus = async () => {
      setLoadingContract(true);
      try {
        const contractStatus = await requestContractStatus();
        setHasAcceptedContract(contractStatus === 'true'); // Convert stored value to boolean
      } catch (error) {
        console.error('Error checking Contract status:', error);
      } finally {
        setLoadingContract(false);
      }
      
    };

    checkContractStatus();
  }, []);

  if(loadingContract || loadingPermissions){
    return <></>;
  }

  if (!hasAcceptedContract) {
    return <ContractComponent 
      onAccept={async ()=>{
        await acceptContract();
      }} 
      onDeny={()=>{
        RNExitApp.exitApp();
      }}
      />;
  }

  return (
    <Provider store={store}>
        <RootStackScreen />
    </Provider>
  );
}
export default App;
