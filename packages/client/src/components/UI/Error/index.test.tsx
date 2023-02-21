import React from 'react'
import { render } from '@testing-library/react'

import { ErrorBoundary } from '.'

describe('<ErrorBoundary />', () => {
  test('should component render', () => {
    const ThrowError = () => {
      throw new Error('Test error...')
    }

    const {asFragment} = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
