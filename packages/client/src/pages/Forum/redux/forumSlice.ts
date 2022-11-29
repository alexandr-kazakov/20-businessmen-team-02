import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { StatusType } from '../../../app/apiTypes'
import { ForumType } from '../types'

export const getForums: any = createAsyncThunk('forum/getForums', () => {
  return api.get('forum/')
})

interface IInitialState {
  status: StatusType | ''
  message: string
  listForums: ForumType[]
  selectedForum: ForumType | null
}

const initialState: IInitialState = {
  status: '',
  message: '',
  listForums: [],
  selectedForum: null,
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setSelectedForum(state, { payload }) {
      state.selectedForum = payload
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

export const { setSelectedForum } = forumSlice.actions

export default forumSlice.reducer
