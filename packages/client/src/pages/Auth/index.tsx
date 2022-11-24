import React from 'react'
import { useAppSelector } from '../../app/redux/hooks'
import { AuthSignin } from './components/AuthSignin'
import { AuthSignup } from './components/AuthSignup'
import styles from './styles.module.scss'

const AuthPage: React.FC = () => {
  const { isSignin } = useAppSelector(state => state.auth)

  return (
    <div className={styles.auth}>
      {isSignin ? <AuthSignin /> : <AuthSignup />}
    </div>
  )
}

export default AuthPage
