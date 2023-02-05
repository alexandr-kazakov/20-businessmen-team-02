import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { StatusType } from '../../../app/apiTypes'

import type { TForum } from '../types'
import type { RootState } from '../../../app/redux/store'

export const getAllTopics: any = createAsyncThunk('forum/getAllTopics', () => {
  return api.get('topic/', undefined, true)
})

export const getTopic: any = createAsyncThunk('forum/getTopic', (topicId: string) => {
  return api.get(`topic/${topicId}`, undefined, true)
})

export const postTopic: any = createAsyncThunk('forum/postTopic', (data: any) => {
  return api.post('topic/', data, true)
})

export const deleteTopic: any = createAsyncThunk('forum/deleteTopic', (topicId: string) => {
  return api.delete(`topic/${topicId}`, true)
})

export const getCommentsTopic: any = createAsyncThunk('forum/getCommentsTopic', (topicId: string) => {
  return api.get(`comment/?id_topic=${topicId}`, undefined, true)
})

export const getAnswersComment: any = createAsyncThunk('forum/getAnswersComment', (commentId: string) => {
  return api.get(`comment/?id_comment=${commentId}`, undefined, true)
})

export const getComment: any = createAsyncThunk('forum/getComment', (commentId: string) => {
  return api.get(`comment/${commentId}`, undefined, true)
})

export const createComment: any = createAsyncThunk('forum/createComment', (data: any) => {
  return api.post('comment/', data, true)
})

export const deleteComment: any = createAsyncThunk('forum/deleteComment', (commentId: string) => {
  return api.delete(`comment/${commentId}`, true)
})

export const getAllReactions: any = createAsyncThunk('forum/getAllReactions', () => {
  return api.get('reaction/', true)
})

export const createReaction: any = createAsyncThunk('forum/createReaction', (data: any) => {
  return api.post('reaction/', data, true)
})

interface IInitialState {
  status: StatusType | ''
  isCreateTopic: boolean
  topicsList: TForum[]
  commentsTopic: any[]
  selectedIdTopic: number | null
  selectedIdComment: number | null
}

const initialState: IInitialState = {
  status: '',
  isCreateTopic: false,
  topicsList: [],
  commentsTopic: [],
  selectedIdTopic: null,
  selectedIdComment: null,
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
    setSelectedIdComment(state, { payload }) {
      state.selectedIdComment = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllTopics.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getAllTopics.fulfilled, (state, { payload }) => {
      state.topicsList = payload.data
      state.status = StatusType.success
    })
    builder.addCase(getAllTopics.rejected, state => {
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
    builder.addCase(deleteTopic.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(deleteTopic.fulfilled, state => {
      state.status = StatusType.success
    })
    builder.addCase(deleteTopic.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(getCommentsTopic.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getCommentsTopic.fulfilled, (state, { payload }) => {
      state.commentsTopic = payload.data
      state.status = StatusType.success
    })
    builder.addCase(getCommentsTopic.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(getAnswersComment.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getAnswersComment.fulfilled, state => {
      state.status = StatusType.success
    })
    builder.addCase(getAnswersComment.rejected, state => {
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
    builder.addCase(deleteComment.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(deleteComment.fulfilled, state => {
      state.status = StatusType.success
    })
    builder.addCase(deleteComment.rejected, state => {
      state.status = StatusType.error
    })
  },
})

export const getSelectedTopic = createSelector(
  (state: RootState) => state.forum,
  stateForum => stateForum.topicsList.find((topic: TForum) => topic.id === stateForum.selectedIdTopic)
)

export const getSelectedComment = createSelector(
  (state: RootState) => state.forum,
  stateForum => stateForum.commentsTopic.find((comment: any) => comment.id === stateForum.selectedIdComment)
)

export const { setIsCreateTopic, setSelectedIdTopic, setSelectedIdComment } = forumSlice.actions

export default forumSlice.reducer
