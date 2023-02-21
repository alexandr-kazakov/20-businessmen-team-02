import React from 'react'
import { render } from '@testing-library/react'
import { Snackbar } from '@/components/Snackbar/index'

jest.mock('react-redux', () => ({
  useSelector: () => ({ message: 'error', isShow: true }),
  useDispatch: jest.fn()
}));

test('should render Snackbar component', () => {
  const {asFragment} = render(<Snackbar/>)

  expect(asFragment()).toMatchSnapshot()
})