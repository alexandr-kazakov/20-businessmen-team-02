import { createSlice } from '@reduxjs/toolkit'

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`

  return theme ? theme : 'light'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: getTheme(),
  reducers: {
    setTheme: (state, action) => action.payload,
  },
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
