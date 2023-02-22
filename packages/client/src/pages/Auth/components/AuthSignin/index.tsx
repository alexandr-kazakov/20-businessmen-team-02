import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Controller, type FieldValues, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../../../app/redux/hooks'
import { signin, setIsSigninView, getOAuthUrl } from '../../redux/authSlice'
import { showSnackBar } from '../../../../components/Snackbar/redux/snackbarSlice'
import { Input } from '../../../../components/UI/Input'
import { Button, ButtonVariant } from '../../../../components/UI/Button'
import { RoutersPaths } from '../../../../components/Routers/types'
import { LOGIN_REGEXP, PASSWORD_REGEXP } from '../../../../lib/regexp'

import styles from './styles.module.scss'

const INIT_VALUES = {
  login: '',
  password: '',
}

export const AuthSignIn: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const [oAuthYandexUrl, setOAuthYandexUrl] = useState('')

  const { control, handleSubmit } = useForm({ defaultValues: INIT_VALUES })

  const onSubmit = async (data: FieldValues): Promise<void> => {
    const response = await dispatch(signin(data))

    if (response.error) {
      dispatch(showSnackBar(response.error.message))
    } else {
      history.push(RoutersPaths.main)
    }
  }

  const handlerToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(setIsSigninView())
  }

  useEffect(() => {
    if (!oAuthYandexUrl) {
      getOAuthUrl().then(setOAuthYandexUrl)
    }
  }, [oAuthYandexUrl])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <span className={styles.title}>Вход</span>
      <div className={styles.inputs}>
        <Controller
          name="login"
          control={control}
          rules={{ required: true, pattern: LOGIN_REGEXP }}
          render={({ field, fieldState }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="Логин"
              isValid={!(fieldState.error && 'error')}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: true, pattern: PASSWORD_REGEXP }}
          render={({ field, fieldState }) => (
            <Input
              type="password"
              value={field.value}
              onChange={field.onChange}
              placeholder="Пароль"
              isValid={!(fieldState.error && 'error')}
            />
          )}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="submit">Войти</Button>
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
