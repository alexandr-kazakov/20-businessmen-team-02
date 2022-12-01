import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../../pages/Auth/redux/authSlice'
import forumSlice from '../../pages/Forum/redux/forumSlice'

export const createStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      forum: forumSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
