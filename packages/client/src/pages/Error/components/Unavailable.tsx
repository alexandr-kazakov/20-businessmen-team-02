import React from 'react'

import { AbstractError, type ErrorPageProps } from './AbstractError'

const errorPageProps: ErrorPageProps = {
  code: '500',
  description: 'Server error',
  message: 'Sorry, something goes wrong',
  showRedirect: false,
}

export const UnavailablePage: React.FC = () => <AbstractError {...errorPageProps} />
