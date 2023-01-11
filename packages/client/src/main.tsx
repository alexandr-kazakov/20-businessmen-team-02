import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { registerServiceWorker } from './lib/register-service-worker'
import { createStore } from './app/redux/store'
import { AppString } from './components/App'
import './index.css'

const store = createStore(window.__PRELOADED_STATE__)

delete window.__PRELOADED_STATE__

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <Provider store={store}>
      <AppString />
    </Provider>
  </BrowserRouter>
)

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}
