import { ErrorPage } from '..'
import { ErrorPageProps } from '../types'

export const UnavailablePage = function () {
  const errorPageProps: ErrorPageProps = {
    code: '500',
    description: 'Server error',
    message: 'Sorry, something goes wrong',
    showRedirect: false,
  }

  return <ErrorPage {...errorPageProps} />
}
