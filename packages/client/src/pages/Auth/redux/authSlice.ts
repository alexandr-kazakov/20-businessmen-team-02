import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { StatusType } from '../../../app/apiTypes'
import { type IAuthSignIn, type IAuthSignup } from '../types'

export const signin: any = createAsyncThunk('auth/signin', async (data: IAuthSignIn) => {
  const response = await api.post('auth/signin/', data)

  if (response.data === 'OK') {
    return api.get('auth/user/')
  }
})

export const signup: any = createAsyncThunk('auth/signup', async (data: IAuthSignup) => {
  const response = await api.post('auth/signup/', data)

  if (response.data.id) {
    return api.get('auth/user/')
  }
})

export const logout: any = createAsyncThunk('auth/logout', () => {
  return api.post('auth/logout/')
})

interface IInitialState {
  status: StatusType | ''
  isLoadingProtectedRouter: boolean
  user: IUser | null
  isSigninView: boolean
}

interface IUser {
  avatar: any | null
  display_name: string | null
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
}

const initialState: IInitialState = {
  status: '',
  isLoadingProtectedRouter: true,
  user: null,
  isSigninView: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoadingProtectedRouter(state, { payload }) {
      state.isLoadingProtectedRouter = payload
    },
    setUser(state, { payload }) {
      state.user = payload
    },
    setIsSigninView(state) {
      state.isSigninView = !state.isSigninView
    },
  },
  extraReducers: builder => {
    builder.addCase(signin.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(signin.fulfilled, (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload.data))

      state.user = payload.data
      state.status = StatusType.success
    })
    builder.addCase(signin.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(signup.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload.data))

      state.user = payload.data
      state.status = StatusType.success
    })
    builder.addCase(signup.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(logout.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(logout.fulfilled, state => {
      localStorage.removeItem('user')

      state.user = null
      state.status = StatusType.success
    })
    builder.addCase(logout.rejected, state => {
      state.status = StatusType.error
    })
  },
})

export const { setIsLoadingProtectedRouter, setUser, setIsSigninView } = authSlice.actions

export default authSlice.reducer
