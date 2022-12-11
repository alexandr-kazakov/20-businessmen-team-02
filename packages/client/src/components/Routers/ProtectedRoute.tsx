import React, { useEffect, useState, useCallback, FC } from 'react'
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { setUser } from '@/pages/Auth/redux/authSlice'
import { Spinner } from '@/components/Spinner'
import { RoutersPaths } from './types'

type Props = RouteProps & {
  component: React.ElementType
}

export const ProtectedRoute: FC<Props> = props => {
  const { component: Component, ...rest } = props

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

export default ProtectedRoute
