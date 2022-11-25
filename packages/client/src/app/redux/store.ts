import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../../pages/Auth/redux/authSlice'

export const createStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
