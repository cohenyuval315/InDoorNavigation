import { useEffect, useState } from 'react';
import { LoadingScreen } from '../screens/general';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuildings, selectBuildingsError, selectBuildingsStatus } from '../app/building/buildings-slice';
import Status from '../app/status';
import { UnknownErrorScreen } from '../screens/errors';
import { useTheme } from '../contexts/ThemeContext';

const DataInitializer = ({children}) => {

    const [loadingInitialData,setLoadingInitialData] = useState(true);
    const [error,setError] = useState(null);
    const dispatch = useDispatch();
    const buildingsStatus = useSelector(selectBuildingsStatus)
    const buildingsError = useSelector(selectBuildingsError)

    async function loadData(){
        setLoadingInitialData(true);
        await Promise.all([
            dispatch(fetchBuildings()),
        ])
        setLoadingInitialData(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            await loadData();
        };
        fetchData(); 
    }, []);     

    useEffect(()=>{
        switch(buildingsStatus){
            case Status.IDLE:{
                loadData()
                break;
            }
            case Status.FAILED:{
                setError(buildingsError);
            }
            case Status.SUCCEEDED:{
                if (!loadingInitialData && !error){
                    setLoadingInitialData(false);
                    setError(null);
                }                
                
            }
        }
    },[dispatch,buildingsStatus, loadingInitialData, error])


    if (loadingInitialData){
        return <LoadingScreen/>
    }

    if (error){
        return <UnknownErrorScreen error={error}/>
    }    

    return (
        <>
            {children}
        </>
    );

    
    
}

export default DataInitializer;