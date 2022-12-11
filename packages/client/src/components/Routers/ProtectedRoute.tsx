import React, { useEffect, useState, useCallback } from 'react'
import { Route, Redirect, type RouteProps, type RouteComponentProps } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { setUser } from '@/pages/Auth/redux/authSlice'
import { Spinner } from '@/components/Spinner'
import { RoutersPaths } from './types'

type ProtectedRouteProps = RouteProps & {
  component: React.ElementType
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState<boolean>(true)

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

  useEffect(() => {
    const storageUser = localStorage.getItem('user')

    if (storageUser) {
      dispatch(setUser(JSON.parse(storageUser)))
    }

    setIsLoading(false)
  }, [])

  return isLoading ? <Spinner /> : <Route {...rest} render={renderComponent} />
}
