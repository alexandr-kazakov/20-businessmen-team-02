import React, { FC } from 'react'
import { useAppSelector } from '../../app/redux/hooks'
import { AuthSignin } from './components/AuthSignin'
import { AuthSignup } from './components/AuthSignup'
import styles from './styles.module.scss'

const AuthPage: FC = () => {
  const { isSigninView } = useAppSelector(state => state.auth)

  return <div className={styles.auth}>{isSigninView ? <AuthSignin /> : <AuthSignup />}</div>
}

export default AuthPage
