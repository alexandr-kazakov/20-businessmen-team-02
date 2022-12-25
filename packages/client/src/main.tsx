import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { registerServiceWorker } from './lib/register-service-worker'
import { store } from './app/redux/store'
import { App } from './components/App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}
