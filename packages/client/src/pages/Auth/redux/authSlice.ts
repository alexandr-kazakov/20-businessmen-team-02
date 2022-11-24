import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../app/api'

export const login: any = createAsyncThunk(
  'auth/login',
  async (data: { [key: string]: any }) => {
    return await api.post('/auth/login/', data)
  }
)

interface IInitialState {
  isAuth: boolean
  isLoading: boolean
  status: string
  message: string
  isSignin: boolean
}

const initialState: IInitialState = {
  isAuth: false,
  isLoading: false,
  status: '',
  message: '',
  isSignin: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, { payload }) {
      api.setUserToken(payload)
      state.isAuth = true
    },
    setIsSignin(state) {
      state.isSignin = !state.isSignin
    },
  },
  extraReducers: {
    [login.pending]: state => {
      state.status = 'loading'
    },
    [login.fulfilled]: (state, { payload }) => {
      const { data } = payload
      localStorage.setItem('JWT', JSON.stringify(data))
      api.setUserToken(data.access)
      state.isAuth = true
      state.status = 'success'
    },
    [login.rejected]: state => {
      state.message = 'Ошибка авторизации'
      state.status = 'error'
    },
  },
})

export const { setLogin, setIsSignin } = authSlice.actions

export default authSlice.reducer
