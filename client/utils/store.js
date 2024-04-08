import { configureStore } from '@reduxjs/toolkit'
import filmfindrReducer from './filmfindrSlice'

export const store = configureStore({
  reducer: {
    myReducers: filmfindrReducer,
  },
})