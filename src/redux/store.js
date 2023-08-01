import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './reducers/dashboardSlice';
import mapReducer from './reducers/mapSlice';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default configureStore({
    reducer: {
        dashboard: dashboardReducer,
        toastr: toastrReducer,
        map: mapReducer
    },
})