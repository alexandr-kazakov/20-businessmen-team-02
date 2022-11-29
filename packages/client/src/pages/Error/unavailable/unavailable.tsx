import React from 'react'
import { ErrorPage } from '..'
import { ErrorPageProps } from '../types'

export const UnavailablePage: React.FC = function () {
  const errorPageProps: ErrorPageProps = {
    code: '500',
    description: 'Server error',
    message: 'Sorry, something goes wrong',
    showRedirect: false,
  }

  return <ErrorPage {...errorPageProps} />
}
