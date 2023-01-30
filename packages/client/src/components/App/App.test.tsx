import { App } from './index'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { createStore } from '../../app/redux/store'

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }))

test('Example test', async () => {
  render(
    <BrowserRouter>
      <Provider store={createStore(undefined)}>
        <App />
      </Provider>
    </BrowserRouter>
  )
})
