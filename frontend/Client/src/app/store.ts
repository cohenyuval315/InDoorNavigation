import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './map/map-slice';
import userOrientationReducer from './user/user-orientation-slice';

const rootReducer = {
    mapReducer:mapReducer,
    userOrientationReducer:userOrientationReducer
}

const store = configureStore({
    reducer: rootReducer
});


export default store;

