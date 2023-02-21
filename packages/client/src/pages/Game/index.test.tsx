import React from 'react'
import { render } from '@testing-library/react'

import GamePage from '@/pages/Game/index'

jest.mock('react-redux', () => ({
  useSelector: () => ({ user: {} }),
  useDispatch: jest.fn(),
}))

test('should render GamePage component', () => {
  const { asFragment } = render(<GamePage />)

  expect(asFragment()).toMatchSnapshot()
})
