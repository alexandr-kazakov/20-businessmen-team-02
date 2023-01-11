import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppString } from './src/components/App'
import { createStore } from './src/app/redux/store'

export { createStore }

export const render = (store: any, url: any) => {
  return renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <AppString />
      </Provider>
    </StaticRouter>
  )
}
