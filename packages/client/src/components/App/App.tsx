import React, { useEffect, FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useAppDispatch } from '@/app/redux/hooks'
import { setUser } from '@/pages/Auth/redux/authSlice'
import { Navigation } from '../Navigation'
import ProtectedRoute from '../Routers/ProtectedRoute'
import AuthPage from '@/pages/Auth'
import { NotFoundPage, UnavailablePage } from '@/pages/Error'
import { Leaderboard } from '@/pages/Leaderboard'
import MainPage from '@/pages/Main'
import GamePage from '@/pages/Game'
import ForumPage from '@/pages/Forum'
import ProfilePage from '@/pages/Profile'
import ChangePassword from '@/pages/ChangePassword'
import { ErrorBoundary } from '../UI/Error'
import { RoutersPaths } from '../Routers/types'
import styles from './styles.module.scss'

const App: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // падает тест
    // const fetchServerData = async () => {
    //   const url = `http://localhost:${__SERVER_PORT__}`
    //   const response = await fetch(url)
    //   const data = await response.json()
    //   console.log(data)
    // }
    // fetchServerData()

    const storageUser = localStorage.getItem('user')

    if (storageUser) {
      dispatch(setUser(JSON.parse(storageUser)))
    }
  }, [dispatch])

  return (
    <div className={styles.app}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </div>
  )
}

export default App
