import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import AuthPage from '../../pages/Auth'
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
      </Switch>
    </div>
  )
}

export default App
