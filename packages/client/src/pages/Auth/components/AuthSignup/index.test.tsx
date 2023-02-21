import React from 'react'
import { render } from '@testing-library/react'
import { AuthSignUp } from '@/pages/Auth/components/AuthSignup/index'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

test('should render AuthSignUp component', () => {
  const { asFragment } = render(<AuthSignUp />)

  expect(asFragment()).toMatchSnapshot()
})
