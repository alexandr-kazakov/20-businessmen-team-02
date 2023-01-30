import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { App } from './src/components/App'
import { createStore } from './src/app/redux/store'

export { createStore }

export const render = (store: any, url: string) => {
  return renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
}
