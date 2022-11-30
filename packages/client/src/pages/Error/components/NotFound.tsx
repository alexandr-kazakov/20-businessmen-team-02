import React from 'react'
import { AbstractError } from './AbstractError'
import { ErrorPageProps } from '../types'

export const NotFoundPage: React.FC = () => {
  const errorPageProps: ErrorPageProps = {
    code: '404',
    description: 'Page not found',
    message:
      'Oops! The page you are looking for does not exist. It might have been moved or deleted.',
    showRedirect: true,
  }

  return <AbstractError {...errorPageProps} />
}
