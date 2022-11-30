import React from 'react'
import { AbstractError } from './AbstractError'
import { ErrorPageProps } from '../types'

export const UnavailablePage: React.FC = () => {
  const errorPageProps: ErrorPageProps = {
    code: '500',
    description: 'Server error',
    message: 'Sorry, something goes wrong',
    showRedirect: false,
  }

  return <AbstractError {...errorPageProps} />
}
