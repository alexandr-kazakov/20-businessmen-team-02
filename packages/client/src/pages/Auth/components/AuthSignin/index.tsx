import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { signin, setIsSigninView } from '@/pages/Auth/redux/authSlice'
import { useAppDispatch } from '@/app/redux/hooks'
import { Button, ButtonVariant } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import type { IAuthSignIn } from '../../types'

import styles from './styles.module.scss'

export const AuthSignIn: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const [values, setValues] = useState<IAuthSignIn>({ login: '', password: '' })
  const [disabled, setDisabled] = useState(true)

  const handlerChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setValues({ ...values, [name]: value })
    },
    [values]
  )

  const handlerSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await dispatch(signin(values))
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handlerToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(setIsSigninView())
  }

  useEffect(() => {
    if (!values.login || !values.password) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [values])

  return (
    <form className={styles.form} onSubmit={handlerSubmit}>
      <span className={styles.title}>Вход</span>
      <div className={styles.inputs}>
        <Input onChange={handlerChange} type="text" name="login" value={values.login} placeholder="Логин" />
        <Input onChange={handlerChange} type="password" name="password" value={values.password} placeholder="Пароль" />
      </div>
      <div className={styles.buttons}>
        <Button type="submit" disabled={disabled}>
          Авторизоваться
        </Button>
        <Button onClick={handlerToggle} variant={ButtonVariant.SECONDARY}>
          Нет аккаунта?
        </Button>
      </div>
    </form>
  )
}
