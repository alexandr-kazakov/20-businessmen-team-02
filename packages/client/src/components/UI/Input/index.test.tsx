import React from 'react'
import { render } from '@testing-library/react'
import {Input} from '@/components/UI/Input'

test('should render Input component', () => {
  const {asFragment} = render(<Input />)

  expect(asFragment()).toMatchSnapshot()
})