import React from 'react'

import { AbstractError, type ErrorPageProps } from './AbstractError'

const ERROR_PAGE_PROPS: ErrorPageProps = {
  code: '404',
  description: 'Page not found',
  message: 'Oops! The page you are looking for does not exist. It might have been moved or deleted.',
  showRedirect: true,
}

export const NotFoundPage: React.FC = () => <AbstractError {...ERROR_PAGE_PROPS} />
