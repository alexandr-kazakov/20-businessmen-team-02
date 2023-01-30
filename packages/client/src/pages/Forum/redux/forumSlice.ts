import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { StatusType } from '../../../app/apiTypes'

import type { TForum } from '../types'
import type { RootState } from '../../../app/redux/store'

export const getAllTopics: any = createAsyncThunk('forum/getAllTopics', () => {
  return api.get('topic/', undefined, true)
})

export const getTopic: any = createAsyncThunk('forum/getTopic', (topicId: any) => {
  return api.get('topic/', topicId, true)
})

export const postTopic: any = createAsyncThunk('forum/postTopic', (data: any) => {
  return api.post('topic/', data, true)
})

interface IInitialState {
  status: StatusType | ''
  message: string
  isCreateTopic: boolean
  listForums: TForum[]
  selectedIdForum: number | null
}

const initialState: IInitialState = {
  status: '',
  message: '',
  isCreateTopic: false,
  listForums: [],
  selectedIdForum: null,
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setIsCreateTopic(state, { payload }) {
      state.isCreateTopic = payload
    },
    setSelectedIdForum(state, { payload }) {
      state.selectedIdForum = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllTopics.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getAllTopics.fulfilled, (state, { payload }) => {
      state.listForums = payload.data
      state.status = StatusType.success
    })
    builder.addCase(getAllTopics.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(getTopic.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getTopic.fulfilled, (state, { payload }) => {
      console.log('getTopic', payload)
      // state.listForums = payload
      state.status = StatusType.success
    })
    builder.addCase(getTopic.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(postTopic.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(postTopic.fulfilled, state => {
      state.status = StatusType.success
    })
    builder.addCase(postTopic.rejected, state => {
      state.status = StatusType.error
    })
  },
})

export const getSelectedForum = createSelector(
  (state: RootState) => state.forum,
  stateForum => stateForum.listForums.find((forum: TForum) => forum.id === stateForum.selectedIdForum)
)

export const { setIsCreateTopic, setSelectedIdForum } = forumSlice.actions

export default forumSlice.reducer
