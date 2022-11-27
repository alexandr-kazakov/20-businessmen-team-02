import { ErrorPage } from '..'
import { ErrorPageProps } from '../types'

export const NotFoundPage = function () {
  const errorPageProps: ErrorPageProps = {
    code: '404',
    description: 'Page not found',
    message:
      'Oops! The page you are looking for does not exist. It might have been moved or deleted.',
    showRedirect: true,
  }

  return <ErrorPage {...errorPageProps} />
}
