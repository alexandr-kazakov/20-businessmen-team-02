import React from 'react'
import { render } from '@testing-library/react'
import { AuthSignIn } from '@/pages/Auth/components/AuthSignin/index'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

test('should render AuthSignIn component', () => {
  const {asFragment} = render(<AuthSignIn/>)

  expect(asFragment()).toMatchSnapshot()
})