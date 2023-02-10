import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { StatusType } from '../../../app/apiTypes'

import type { ITopic, IComment, INewTopic, INewComment, INewReaction } from '../types'
import type { RootState } from '../../../app/redux/store'

export const getTopics: any = createAsyncThunk('forum/getTopics', () => {
  return api.get('topic/', undefined, true)
})

export const createTopic: any = createAsyncThunk('forum/createTopic', async (data: INewTopic, { dispatch }) => {
  const res = await api.post('topic/', data, true)
  await dispatch(getTopics())
  return res
})

export const getComments: any = createAsyncThunk('forum/getComments', async (topicId: string, { dispatch }) => {
  const res = await api.get(`comment/?id_topic=${topicId}`, undefined, true)
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
    builder.addCase(getTopics.fulfilled, (state, { payload }) => {
      state.topicsList = payload.data
    })
    builder.addCase(createTopic.fulfilled, state => {
      state.isCreateTopic = false
    })
    builder.addCase(getComments.fulfilled, (state, { payload }) => {
      state.commentsTopic = payload.data
    })
    builder.addMatcher(
      action => action.type.endsWith('/pending'),
      state => {
        state.status = StatusType.loading
      }
    )
    builder.addMatcher(
      action => action.type.endsWith('/fulfilled'),
      state => {
        state.status = StatusType.success
      }
    )
    builder.addMatcher(
      action => action.type.endsWith('/rejected'),
      state => {
        state.status = StatusType.error
      }
    )
  },
})

export const getSelectedTopic = createSelector(
  (state: RootState) => state.forum,
  stateForum => stateForum.topicsList.find((topic: ITopic) => topic.id === stateForum.selectedIdTopic)
)

export const { setIsCreateTopic, setSelectedIdTopic } = forumSlice.actions

export default forumSlice.reducer
