import React from 'react'
import { render } from '@testing-library/react'

import CanvasComponent from '@/components/Canvas/index'

test('should render canvas component', () => {
  const {asFragment} = render(
    <CanvasComponent
      className=''
      setScores={jest.fn()}
      level='puzzleLevel'
      initStart={0}
      src=''
    />
  )

  expect(asFragment()).toMatchSnapshot()
})
