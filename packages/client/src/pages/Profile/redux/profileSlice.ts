import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { StatusType } from '../../../app/apiTypes'
import { list } from '../const'

import type { ProfileType } from '../types'

export const getProfile: any = createAsyncThunk('getProfile', () => {
  return api.get('profile/')
})

export const changeUserProfile: any = createAsyncThunk('profile', async (data: any) => {
  const response = await api.put('user/profile/', data)

  if (response.data.id) {
    return api.get('auth/user/')
  }
})

interface IInitialState {
  status: StatusType | ''
  listProfile: ProfileType[]
  profileView: boolean
}

const initialState: IInitialState = {
  status: '',
  listProfile: list,
  profileView: true,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setprofileView(state) {
      state.profileView = !state.profileView
    },
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

export const { setprofileView } = profileSlice.actions
export default profileSlice.reducer
