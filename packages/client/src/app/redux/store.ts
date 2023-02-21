import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../../pages/Auth/redux/authSlice'
import forumSlice from '../../pages/Forum/redux/forumSlice'
import leaderboardSlice from '../../pages/Leaderboard/redux/leaderboardSlice'
import snackSlice from '../../components/Snackbar/redux/snackbarSlice'
import themeSlice from '../../components/Theme/themeSlice'

export const createStore = (preloadedState: any) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      forum: forumSlice,
      snack: snackSlice,
      leaderboard: leaderboardSlice,
      theme: themeSlice,
    },
    preloadedState,
  })
}

export const store = createStore(undefined)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
