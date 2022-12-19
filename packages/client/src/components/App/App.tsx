import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import { NotFoundPage, UnavailablePage } from '@/pages/Error'
import ChangePassword from '@/pages/ChangePassword'
import Leaderboard from '@/pages/Leaderboard'
import ProfilePage from '@/pages/Profile'
import AuthPage from '@/pages/Auth'
import MainPage from '@/pages/Main'
import GamePage from '@/pages/Game'
import ForumPage from '@/pages/Forum'

import { ProtectedRoute } from '@/components/Routers/ProtectedRoute'
import { ErrorBoundary } from '@/components/UI/Error'
import { RoutersPaths } from '@/components/Routers/types'

import styles from './styles.module.scss'

const App: React.FC = () => {
  useEffect(() => {
    // падает тест
    // const fetchServerData = async () => {
    //   const url = `http://localhost:${__SERVER_PORT__}`
    //   const response = await fetch(url)
    //   const data = await response.json()
    //   console.log(data)
    // }
    // fetchServerData()
  }, [])

  return (
    <div className={styles.app}>
      <ErrorBoundary>
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
