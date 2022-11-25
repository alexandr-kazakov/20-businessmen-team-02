import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../app/api'

export const signin: any = createAsyncThunk(
  'auth/signin',
  async (data: { [key: string]: string }) => {
    return await api.post('auth/signin/', data)
  }
)

export const signup: any = createAsyncThunk(
  'auth/signup',
  async (data: { [key: string]: string }) => {
    return await api.post('auth/signup/', data)
  }
)

interface IInitialState {
  isAuth: boolean
  isLoading: boolean
  status: string
  message: string
  isSigninView: boolean
}

const initialState: IInitialState = {
  status: '',
  message: '',
  isLoading: false,
  isAuth: false,
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
      state.status = 'loading'
    })
    builder.addCase(signin.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.status = 'success'
    })
    builder.addCase(signin.rejected, state => {
      state.status = 'error'
    })
    builder.addCase(signup.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.status = 'success'
    })
    builder.addCase(signup.rejected, state => {
      state.status = 'error'
    })
  },
})

export const { setIsSigninView } = authSlice.actions

export default authSlice.reducer
