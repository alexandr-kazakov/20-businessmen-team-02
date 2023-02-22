import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useAppDispatch } from '../../app/redux/hooks'
import { setIsLoadingProtectedRouter, setUser } from '../../pages/Auth/redux/authSlice'

import { NotFoundPage, UnavailablePage } from '../../pages/Error'
import ChangePassword from '../../pages/ChangePassword'
import Leaderboard from '../../pages/Leaderboard'
import ProfilePage from '../../pages/Profile'
import AuthPage from '../../pages/Auth'
import MainPage from '../../pages/Main'
import GamePage from '../../pages/Game'
import ForumPage from '../../pages/Forum'

import { Navigation } from '../../components/Navigation'
import { ProtectedRoute } from '../../components/Routers/ProtectedRoute'
import { ErrorBoundary } from '../../components/UI/Error'
import { Snackbar } from '../../components/Snackbar'
import { RoutersPaths } from '../../components/Routers/types'
import { Theme } from '../../components/Theme'

import styles from './styles.module.scss'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const storageUser = localStorage.getItem('user')

    if (storageUser) {
      dispatch(setUser(JSON.parse(storageUser)))
    }

    const timer = setTimeout(() => {
      dispatch(setIsLoadingProtectedRouter(false))
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [dispatch])

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <Theme />
        <Navigation />
        <Switch>
          <Route path={RoutersPaths.main} exact component={MainPage} />
          <Route path={RoutersPaths.auth} exact component={AuthPage} />
          <ProtectedRoute path={RoutersPaths.game} exact component={GamePage} />
          <ProtectedRoute path={RoutersPaths.forum} exact component={ForumPage} />
          <ProtectedRoute path={RoutersPaths.profile} exact component={ProfilePage} />
          <ProtectedRoute path={RoutersPaths.leaderboard} exact component={Leaderboard} />
          <ProtectedRoute path={RoutersPaths.changePassword} exact component={ChangePassword} />
          <Route path={RoutersPaths.errorServer} exact component={UnavailablePage} />
          <Route path={['/*', `${RoutersPaths.errorClient}`]} exact component={NotFoundPage} />
        </Switch>
        <Snackbar />
      </ErrorBoundary>
    </div>
  )
}
