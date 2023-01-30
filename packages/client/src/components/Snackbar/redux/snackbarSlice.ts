import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  message: string
  isShow: boolean
}

const initialState: IInitialState = {
  message: '',
  isShow: false,
}

export const snackSlice = createSlice({
  name: 'snackBar',
  initialState,
  reducers: {
    showSnackBar(state, { payload }) {
      state.message = payload
      state.isShow = true
    },
    hideSnackBar(state) {
      state.isShow = false
      state.message = ''
    },
  },
})

export const { showSnackBar, hideSnackBar } = snackSlice.actions

export default snackSlice.reducer
