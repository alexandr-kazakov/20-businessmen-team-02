import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { RootState } from '../../../app/redux/store'
import { StatusType } from '../../../app/apiTypes'
import { list } from '../../Profile/const'
import { ProfileType } from '../types'

export const getProfile: any = createAsyncThunk('forum/getProfile', () => {
  return api.get('forum/')
})

interface IInitialState {
  status: StatusType | ''
  listProfile: ProfileType[]
}

const initialState: IInitialState = {
  status: '',
  listProfile: list,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(getProfile.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.listProfile = payload
      state.status = StatusType.success
    })
    builder.addCase(getProfile.rejected, state => {
      state.status = StatusType.error
    })
  },
})

export default profileSlice.reducer
