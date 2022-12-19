import React, { useCallback } from 'react'
import { Route, Redirect, type RouteProps, type RouteComponentProps } from 'react-router-dom'
import { useAppSelector } from '@/app/redux/hooks'
import { RoutersPaths } from './types'

type ProtectedRouteProps = RouteProps & {
  component: React.ElementType
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
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
