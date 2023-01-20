import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/redux/hooks'

import { signin, setIsSigninView, getOAuthUrl } from '../../redux/authSlice'
import { Input } from '../../../../components/UI/Input'
import { Button, ButtonVariant } from '../../../../components/UI/Button'
import type { IAuthSignIn } from '../../types'
import { RoutersPaths } from '../../../../components/Routers/types'

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

  const [oAuthYandexUrl, setOAuthYandexUrl] = useState('')

  useEffect(() => {
    if (!oAuthYandexUrl) {
      getOAuthUrl().then(setOAuthYandexUrl)
    }
  }, [oAuthYandexUrl])

  const handlerSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const response = await dispatch(signin(values))

    if (response.error) {
      console.log(response.error)
    } else {
      history.push(RoutersPaths.main)
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
          Войти
        </Button>
        <a href={oAuthYandexUrl} className={styles.yandexButton}>
          <Button type="button">Войти через YandexId</Button>
        </a>
        <Button onClick={handlerToggle} variant={ButtonVariant.SECONDARY}>
          Нет аккаунта?
        </Button>
      </div>
    </form>
  )
}
