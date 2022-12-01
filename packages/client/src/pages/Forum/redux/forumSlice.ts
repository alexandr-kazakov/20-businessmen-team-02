import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { RootState } from '../../../app/redux/store'
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

const forumState = (state: RootState) => state.forum

export const getSelectedForum = createSelector(forumState, state =>
  state.listForums.find((forum: ForumType) => forum.id === state.selectedIdForum)
)

export const { setSelectedIdForum } = forumSlice.actions

export default forumSlice.reducer
