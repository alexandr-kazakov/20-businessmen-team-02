import React from 'react'
import { render } from '@testing-library/react'
import { Button } from '@/components/UI/Button/index'

test('should render Button component', () => {
  const { asFragment } = render(<Button>BUTTON</Button>)

  expect(asFragment()).toMatchSnapshot()
})
