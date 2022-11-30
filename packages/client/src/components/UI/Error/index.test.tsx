import React from 'react'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'

import { ErrorBoundary } from '.'

describe('<ErrorBoundary />', () => {
  test('should component render', () => {
    const ThrowError = () => {
      throw new Error('Test error...')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('errorboundary')).toBeVisible()
  })
})
