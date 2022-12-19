import React from 'react'

import { useAppSelector } from '@/app/redux/hooks'

import { AuthSignIn } from './components/AuthSignin'
import { AuthSignUp } from './components/AuthSignup'

import styles from './styles.module.scss'

const AuthPage: React.FC = () => {
  const { isSigninView } = useAppSelector(state => state.auth)

  return <div className={styles.auth}>{isSigninView ? <AuthSignIn /> : <AuthSignUp />}</div>
}

export default AuthPage
