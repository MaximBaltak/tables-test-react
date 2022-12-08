import {configureStore} from "@reduxjs/toolkit";
import tableReducer from './slices/tablesSlice'
export const store = configureStore({
    reducer:{
        tableReducer
    },
    devTools:true
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
