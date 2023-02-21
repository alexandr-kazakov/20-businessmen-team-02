import React from 'react'
import { render } from '@testing-library/react'

import ProfilePage from '@/pages/Profile/index'

jest.mock('react-redux', () => ({
  useSelector: () => ({ user: {}, profileView: jest.fn()}),
  useDispatch: jest.fn()
}));

test('should render ProfilePage component', () => {
  const {asFragment} = render(<ProfilePage/>)

  expect(asFragment()).toMatchSnapshot()
})