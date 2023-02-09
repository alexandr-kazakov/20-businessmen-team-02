import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { StatusType } from '../../../app/apiTypes'

import type { ITopic, IComment, INewTopic, INewComment, INewReaction } from '../types'
import type { RootState } from '../../../app/redux/store'

export const getTopics: any = createAsyncThunk('forum/getTopics', () => {
  return api.get('topic/', undefined, true)
})

export const createTopic: any = createAsyncThunk('forum/createTopic', (data: INewTopic, { dispatch }) => {
  const res = api.post('topic/', data, true)
  dispatch(getTopics())
  return res
})

export const getComments: any = createAsyncThunk('forum/getComments', (topicId: string, { dispatch }) => {
  const res = api.get(`comment/?id_topic=${topicId}`, undefined, true)
  dispatch(setSelectedIdTopic(topicId))
  return res
})

export const getComment: any = createAsyncThunk('forum/getComment', (commentId: string) => {
  return api.get(`comment/${commentId}`, undefined, true)
})

export const createComment: any = createAsyncThunk('forum/createComment', (data: INewComment) => {
  return api.post('comment/', data, true)
})

export const createReaction: any = createAsyncThunk('forum/createReaction', (data: INewReaction) => {
  return api.post('reaction/', data, true)
})

interface IInitialState {
  status: StatusType | ''
  isCreateTopic: boolean
  topicsList: ITopic[]
  selectedIdTopic: string | null
  commentsTopic: IComment[]
}

const initialState: IInitialState = {
  status: '',
  isCreateTopic: false,
  topicsList: [],
  selectedIdTopic: null,
  commentsTopic: [],
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
    builder.addCase(createTopic.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(createTopic.fulfilled, state => {
      state.isCreateTopic = false
      state.status = StatusType.success
    })
    builder.addCase(createTopic.rejected, state => {
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
    builder.addCase(getComment.fulfilled, state => {
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
  stateForum => stateForum.topicsList.find((topic: ITopic) => topic.id === stateForum.selectedIdTopic)
)

export const { setIsCreateTopic, setSelectedIdTopic } = forumSlice.actions

export default forumSlice.reducer
