import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authslice from './slice/authslice'

const rootreducer = combineReducers({
    auth: authslice.reducer,
});
const store = configureStore({
    reducer: rootreducer
})
export default store;