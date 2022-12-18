import React, { useCallback, FC } from 'react'
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom'
import { useAppSelector } from '@/app/redux/hooks'
import { RoutersPaths } from './types'

type Props = RouteProps & {
  component: React.ElementType
}

export const ProtectedRoute: FC<Props> = props => {
  const { component: Component, ...rest } = props

  const { user } = useAppSelector(state => state.auth)

  const renderComponent = useCallback(
    (props: RouteComponentProps) => {
      return user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: RoutersPaths.auth,
            state: {
              from: props.location,
            },
          }}
        />
      )
    },
    [Component, user]
  )

  return <Route {...rest} render={renderComponent} />
}

export default ProtectedRoute
