import React from 'react'
// import { Provider } from 'react-redux'
// import { App } from './src/components/App'
import { renderToString } from 'react-dom/server'

export const App = () => {
  return <div>Hello world!!!</div>
}

// import { configureStore } from '@reduxjs/toolkit'
// import authSlice from './src/pages/Auth/redux/authSlice'
// import forumSlice from './src/pages/Forum/redux/forumSlice'
// import profileSlice from './src/pages/Profile/redux/profileSlice'

// export const createStore = () => {
//   return configureStore({
//     reducer: {
//       auth: authSlice,
//       forum: forumSlice,
//       profile: profileSlice,
//     },
//     // devTools: process.env.NODE_ENV !== 'production',
//   })
// }

export const render = () => {
  return renderToString(
    // <Provider store={store}>
    <App />
    // </Provider>
  )
}
