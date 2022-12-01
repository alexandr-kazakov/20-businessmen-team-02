import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import AuthPage from '../../pages/Auth'
import { NotFoundPage, UnavailablePage } from '../../pages/Error'
import { Leaderboard } from '../../pages/Leaderboard'
import GamePage from '../../pages/Game'
import styles from './styles.module.scss'

const App: React.FC = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <div className={styles.app}>
      <Switch>
        <Route path="/" exact component={AuthPage} />
        <Route path="/404" exact component={NotFoundPage} />
        <Route path="/500" exact component={UnavailablePage} />
        <Route path="/game" component={GamePage} />
        <Route path="/leaderboard" exact component={Leaderboard} />
      </Switch>
    </div>
  )
}

export default App
