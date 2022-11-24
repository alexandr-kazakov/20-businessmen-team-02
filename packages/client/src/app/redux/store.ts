import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../../pages/Auth/redux/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
