import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { StatusType } from '../../../app/apiTypes'

import type { TForum } from '../types'
import type { RootState } from '../../../app/redux/store'

export const getTopics: any = createAsyncThunk('forum/getTopics', () => {
  return api.get('topic/', undefined, true)
})

export const getTopic: any = createAsyncThunk('forum/getTopic', (topicId: string) => {
  return api.get(`topic/${topicId}`, undefined, true)
})

export const postTopic: any = createAsyncThunk('forum/postTopic', (data: any) => {
  return api.post('topic/', data, true)
})

export const getComments: any = createAsyncThunk('forum/getComments', (topicId: string) => {
  return api.get(`comment/?id_topic=${topicId}`, undefined, true)
})

export const getComment: any = createAsyncThunk('forum/getComment', (commentId: string) => {
  return api.get(`comment/${commentId}`, undefined, true)
})

export const createComment: any = createAsyncThunk('forum/createComment', (data: any) => {
  return api.post('comment/', data, true)
})

export const createReaction: any = createAsyncThunk('forum/createReaction', (data: any) => {
  return api.post('reaction/', data, true)
})

interface IInitialState {
  status: StatusType | ''
  isCreateTopic: boolean
  topicsList: TForum[]
  selectedIdTopic: number | null
  commentsTopic: any[]
  selectedComment: any
}

const initialState: IInitialState = {
  status: '',
  isCreateTopic: false,
  topicsList: [],
  selectedIdTopic: null,
  commentsTopic: [],
  selectedComment: null,
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setIsCreateTopic(state, { payload }) {
      state.isCreateTopic = payload
    },
    setSelectedIdTopic(state, { payload }) {
      state.selectedIdTopic = payload
    },
    setSelectedComment(state, { payload }) {
      state.selectedComment = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getTopics.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getTopics.fulfilled, (state, { payload }) => {
      state.topicsList = payload.data
      state.status = StatusType.success
    })
    builder.addCase(getTopics.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(getTopic.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getTopic.fulfilled, state => {
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
    builder.addCase(getComments.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getComments.fulfilled, (state, { payload }) => {
      state.commentsTopic = payload.data
      state.status = StatusType.success
    })
    builder.addCase(getComments.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(getComment.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getComment.fulfilled, (state, { payload }) => {
      state.selectedComment = payload.data
      state.status = StatusType.success
    })
    builder.addCase(getComment.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(createComment.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(createComment.fulfilled, state => {
      state.status = StatusType.success
    })
    builder.addCase(createComment.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(createReaction.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(createReaction.fulfilled, state => {
      state.status = StatusType.success
    })
    builder.addCase(createReaction.rejected, state => {
      state.status = StatusType.error
    })
  },
})

export const getSelectedTopic = createSelector(
  (state: RootState) => state.forum,
  stateForum => stateForum.topicsList.find((topic: TForum) => topic.id === stateForum.selectedIdTopic)
)

export const { setIsCreateTopic, setSelectedIdTopic, setSelectedComment } = forumSlice.actions

export default forumSlice.reducer
