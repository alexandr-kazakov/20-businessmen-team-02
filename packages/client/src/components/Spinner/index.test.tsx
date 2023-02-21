import React from 'react'
import { render } from '@testing-library/react'
import { Spinner } from '@/components/Spinner/index'

test('should render Spinner component', () => {
  const {asFragment} = render(<Spinner/>)

  expect(asFragment()).toMatchSnapshot()
})