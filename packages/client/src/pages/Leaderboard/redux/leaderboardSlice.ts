import { api } from '@/app/api'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { UsersRate, UserRate } from '../types/user-rates'

const TEAM_NAME = 'team-02'
interface LeaderboardState {
  leaderboard: UsersRate
  isLoading: boolean
}

interface LeaderboardRequiestPayload {
  ratingFieldName: string
  cursor: number
  limit: number
}

const initialState: LeaderboardState = {
  leaderboard: [],
  isLoading: false,
}

export const leaderboardThunk = createAsyncThunk('/leaderboard', async (data?: LeaderboardRequiestPayload) => {
  if (data === undefined) {
    data = {
      ratingFieldName: 'scores',
      cursor: 0,
      limit: 10,
    }
  }

  const response = await api.post(`leaderboard/${TEAM_NAME} `, data)

  return response.data
})

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(leaderboardThunk.pending, state => {
      state.isLoading = true
    })

    builder.addCase(leaderboardThunk.fulfilled, (state, { payload }: PayloadAction<{ data: UserRate }[]>) => {
      state.leaderboard = payload.map(item => item.data)
      state.isLoading = false
    })

    builder.addCase(leaderboardThunk.rejected, state => {
      state.isLoading = false
    })
  },
})

export default leaderboardSlice.reducer
