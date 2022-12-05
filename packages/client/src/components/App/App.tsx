import React, { useEffect, FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import AuthPage from '@/pages/Auth'
import { NotFoundPage, UnavailablePage } from '@/pages/Error'
import { Leaderboard } from '@pages/Leaderboard'
import MainPage from '@/pages/Main'
import GamePage from '@/pages/Game'
import ForumPage from '@/pages/Forum'
import ProfilePage from '@/pages/Profile'
import { ErrorBoundary } from '../UI/Error'
import styles from './styles.module.scss'

const App: FC = () => {
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
          <Route path="/" exact component={AuthPage} />
          <Route path="/404" exact component={NotFoundPage} />
          <Route path="/500" exact component={UnavailablePage} />
          <Route path="/main" exact component={MainPage} />
          <Route path="/game" exact component={GamePage} />
          <Route path="/forum" exact component={ForumPage} />
          <Route path="/profile" exact component={ProfilePage} />
           <Route path="/leaderboard" exact component={Leaderboard} />
        </Switch>
      </ErrorBoundary>
    </div>
  )
}

export default App
