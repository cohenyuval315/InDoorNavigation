import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './map/map-slice';
import userOrientationReducer from './user/user-orientation-slice';
import buildingsReducer from './building/buildings-slice';
import ActiveReducer from './active/active-slice';
import { combineReducers } from 'redux'
import logger from './logger';

const rootReducer = combineReducers({
    map:mapReducer,
    orientation:userOrientationReducer,
    buildings:buildingsReducer,
    active:ActiveReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export default store;

