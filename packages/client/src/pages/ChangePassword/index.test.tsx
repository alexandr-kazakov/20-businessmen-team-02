import React from 'react'
import { render } from '@testing-library/react'
import ChangePassword from '@/pages/ChangePassword/index'

jest.mock('react-redux', () => ({
  useSelector: () => ({ user: {} }),
  useDispatch: jest.fn(),
}))

test('should render ChangePassword component', () => {
  const { asFragment } = render(<ChangePassword />)

  expect(asFragment()).toMatchSnapshot()
})
