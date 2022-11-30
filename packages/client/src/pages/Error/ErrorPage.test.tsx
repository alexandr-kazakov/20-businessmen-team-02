import { render, screen } from '@testing-library/react'
import { NotFoundPage } from './components/NotFound'
import { UnavailablePage } from './components/Unavailable'
import { ErrorPageProps } from './types'
import { BrowserRouter } from 'react-router-dom'

describe('Check properties passing - NotFoundPage', () => {
  const notFoundProps: ErrorPageProps = {
    code: '404',
    description: 'Page not found',
    message:
      'Oops! The page you are looking for does not exist. It might have been moved or deleted.',
    showRedirect: true,
  }

  beforeAll(() => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    )
  })

  test('Test', () => {
    expect(screen.getByText(notFoundProps.code).innerHTML).toBe(
      notFoundProps.code
    )
    expect(screen.getByText(notFoundProps.description).innerHTML).toBe(
      notFoundProps.description
    )
    expect(screen.getByText(notFoundProps.message).innerHTML).toBe(
      notFoundProps.message
    )
  })
})

describe('Check properties passing - UnavailablePage', () => {
  const unavailableProps: ErrorPageProps = {
    code: '500',
    description: 'Server error',
    message: 'Sorry, something goes wrong',
    showRedirect: false,
  }

  beforeAll(() => {
    render(
      <BrowserRouter>
        <UnavailablePage />
      </BrowserRouter>
    )
  })

  test('Test', () => {
    expect(screen.getByText(unavailableProps.code).innerHTML).toBe(
      unavailableProps.code
    )
    expect(screen.getByText(unavailableProps.description).innerHTML).toBe(
      unavailableProps.description
    )
    expect(screen.getByText(unavailableProps.message).innerHTML).toBe(
      unavailableProps.message
    )
  })
})
