import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { StatusType } from '../../../app/apiTypes'
import { list } from '../../Forum/const'
import { ForumType } from '../types'

export const getForums: any = createAsyncThunk('forum/getForums', () => {
  return api.get('forum/')
})

interface IInitialState {
  status: StatusType | ''
  message: string
  listForums: ForumType[]
  selectedIdForum: number | null
  selectedForum: ForumType | null
}

const initialState: IInitialState = {
  status: '',
  message: '',
  listForums: list,
  selectedIdForum: null,
  selectedForum: null,
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setSelectedIdForum(state, { payload }) {
      state.selectedIdForum = payload

      const foundedForum = state.listForums.find(forum => forum.id === payload)

      if (foundedForum) {
        state.selectedForum = foundedForum
      }
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

export const { setSelectedIdForum } = forumSlice.actions

export default forumSlice.reducer
