import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../../pages/Auth/redux/authSlice'
import forumSlice from '../../pages/Forum/redux/forumSlice'
import profileSlice from '../../pages/Profile/redux/profileSlice'
import leaderboardSlice from '../../pages/Leaderboard/redux/leaderboardSlice'
import snackSlice from '../../components/Snackbar/redux/snackbarSlice'
import themeSlice from '../../components/Theme/themeSlice'

export const createStore = (preloadedState: any) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      forum: forumSlice,
      profile: profileSlice,
      snack: snackSlice,
      leaderboard: leaderboardSlice,
      theme: themeSlice,
    },
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const store = createStore(undefined)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
