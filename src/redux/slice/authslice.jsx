import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    loading: true,
    auth: null
}
const authslice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setActiveUserHandler: (state, action) => {
            state.loading = true;
            state.auth = action.payload;

        },
        removeActiveUserHandler: (state, action) => {
            state.loading = false;
            state.auth = null;

        },
    }
})
export default authslice;
export const { setActiveUserHandler, removeActiveUserHandler } = authslice.actions
export const isloading = (state) => state.auth.loading;
export const authuser = (state) => state.auth.auth