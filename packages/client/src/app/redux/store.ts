import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../../pages/Auth/redux/authSlice'
import forumSlice from '../../pages/Forum/redux/forumSlice'
import profileSlice from '../../pages/Profile/redux/profileSlice'

export const createStore = (preloadedState: any) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      forum: forumSlice,
      profile: profileSlice,
    },
    preloadedState,
  })
}

export const store = createStore(undefined)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
