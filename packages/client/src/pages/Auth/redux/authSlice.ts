import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../app/api'
import { StatusType } from '../../../app/apiTypes'

import type { IAuthSignIn, IAuthSignup, IUser, OauthYandexId } from '../types'

// TODO: после деплоя добавить продакшн урл..
export const OAUTH_YANDEX_REDIRECT = 'http://localhost:3000'

export const getOAuthUrl = async (): Promise<string> => {
  const { data } = await api.get('oauth/yandex/service-id', {
    redirect_uri: OAUTH_YANDEX_REDIRECT,
  })

  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${OAUTH_YANDEX_REDIRECT}`
}

export const oAuthSignIn: any = createAsyncThunk('oauth/yandex', async (data: OauthYandexId) => {
  await api.post('oauth/yandex/', data)
  return await api.get('auth/user/')
})

export const signin: any = createAsyncThunk('auth/signin', async (data: IAuthSignIn) => {
  const response = await api.post('auth/signin/', data)

  if (response.data === 'OK') {
    return api.get('auth/user/')
  }
})

export const signup: any = createAsyncThunk('auth/signup', async (data: IAuthSignup) => {
  const response = await api.post('auth/signup/', data)

  if (response.data?.id) {
    return api.get('auth/user/')
  }
})

export const logout: any = createAsyncThunk('auth/logout', () => {
  return api.post('auth/logout/')
})

export const getProfile: any = createAsyncThunk('getProfile', () => {
  return api.get('auth/user/')
})

export const changeUserProfile: any = createAsyncThunk('profile', async (data: any) => {
  const response = await api.put('user/profile/', data)

  if (response.data?.id) {
    return api.get('auth/user/')
  }
})

export const changeUserAvatar: any = createAsyncThunk('avatar', async (data: any) => {
  return await api.updateFile('user/profile/avatar', data)
})

interface IInitialState {
  status: StatusType | ''
  isLoadingProtectedRouter: boolean
  user: IUser | null
  isSigninView: boolean
  profileView: boolean
}

const initialState: IInitialState = {
  status: '',
  isLoadingProtectedRouter: true,
  user: null,
  isSigninView: true,
  profileView: true,
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
    setProfileView(state) {
      state.profileView = !state.profileView
    },
  },
  extraReducers: builder => {
    builder.addCase(changeUserAvatar.fulfilled, (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload.data))

      state.user = payload.data
      state.status = StatusType.success
    })
    builder.addCase(oAuthSignIn.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(oAuthSignIn.fulfilled, (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload.data))

      state.user = payload.data
      state.status = StatusType.success
    })
    builder.addCase(oAuthSignIn.rejected, state => {
      state.status = StatusType.error
    })
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
      localStorage.removeItem('user')
      state.user = null
    })
    builder.addCase(getProfile.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload.data))

      state.user = payload.data
      state.status = StatusType.success
    })
    builder.addCase(getProfile.rejected, state => {
      state.status = StatusType.error
    })
    builder.addCase(changeUserProfile.pending, state => {
      state.status = StatusType.loading
    })
    builder.addCase(changeUserProfile.fulfilled, (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload.data))

      state.user = payload.data
      state.status = StatusType.success
    })
    builder.addCase(changeUserProfile.rejected, state => {
      state.status = StatusType.error
    })
  },
})

export const { setIsLoadingProtectedRouter, setUser, setIsSigninView, setProfileView } = authSlice.actions

export default authSlice.reducer
