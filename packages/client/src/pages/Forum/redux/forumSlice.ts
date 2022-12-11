import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { api } from '@/app/api'
import { StatusType } from '@/app/apiTypes'
import { list } from '../const'

import type { TForum } from '../types'
import type { RootState } from '@/app/redux/store'

export const getForums: any = createAsyncThunk('forum/getForums', () => {
  return api.get('forum/')
})

interface IInitialState {
  status: StatusType | ''
  message: string
  listForums: TForum[]
  selectedIdForum: number | null
}

const initialState: IInitialState = {
  status: '',
  message: '',
  listForums: list,
  selectedIdForum: null,
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setSelectedIdForum(state, { payload }) {
      state.selectedIdForum = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getForums.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getForums.fulfilled, (state, { payload }) => {
      state.listForums = payload
      state.status = StatusType.success
    })
    builder.addCase(getForums.rejected, state => {
      state.status = StatusType.error
    })
  },
})

export const getSelectedForum = createSelector(
  (state: RootState) => state.forum,
  stateForum => stateForum.listForums.find((forum: TForum) => forum.id === stateForum.selectedIdForum)
)

export const { setSelectedIdForum } = forumSlice.actions

export default forumSlice.reducer
