import { Tuple, configureStore } from '@reduxjs/toolkit'
import mapReducer from './map/map-slice';
import userOrientationReducer from './user/user-orientation-slice';
import buildingsReducer from './building/buildings-slice';
import { combineReducers } from 'redux'
import logger from 'redux-logger'

const rootReducer = combineReducers({
    map:mapReducer,
    orientation:userOrientationReducer,
    buildings:buildingsReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export default store;

