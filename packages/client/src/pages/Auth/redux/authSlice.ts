import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import {
  StatusType,
  AuthSigninType,
  AuthSignupType,
} from '../../../app/apiTypes'

export const signin: any = createAsyncThunk(
  'auth/signin',
  async (data: AuthSigninType) => {
    return await api.post('auth/signin/', data)
  }
)

export const signup: any = createAsyncThunk(
  'auth/signup',
  async (data: AuthSignupType) => {
    return await api.post('auth/signup/', data)
  }
)

interface IInitialState {
  status: StatusType | ''
  message: string
  isAuthenticated: boolean
  isSigninView: boolean
}

const initialState: IInitialState = {
  status: '',
  message: '',
  isAuthenticated: false,
  isSigninView: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsSigninView(state) {
      state.isSigninView = !state.isSigninView
    },
  },
  extraReducers: builder => {
    builder.addCase(signin.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(signin.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.status = StatusType.success
    })
    builder.addCase(signin.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(signup.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.status = StatusType.success
    })
    builder.addCase(signup.rejected, state => {
      state.status = StatusType.error
    })
  },
})

export const { setIsSigninView } = authSlice.actions

export default authSlice.reducer
