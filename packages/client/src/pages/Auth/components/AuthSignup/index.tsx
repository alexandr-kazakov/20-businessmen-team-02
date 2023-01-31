import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/redux/hooks'

import { signup, setIsSigninView } from '../../redux/authSlice'
import { showSnackBar } from '../../../../components/Snackbar/redux/snackbarSlice'
import { Input } from '../../../../components/UI/Input'
import { Button, ButtonVariant } from '../../../../components/UI/Button'
import type { IAuthSignup } from '../../types'
import { RoutersPaths } from '../../../../components/Routers/types'

import styles from './styles.module.scss'

interface IValues extends IAuthSignup {
  check_password: string
}

const INIT_VALUES: IValues = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  check_password: '',
}

export const AuthSignUp: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const [values, setValues] = useState(INIT_VALUES)
  const [disabled, setDisabled] = useState(true)
  const [isValidPasswords, setIsValidPasswords] = useState(true)

  const handlerChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setValues({ ...values, [name]: value })
    },
    [values]
  )

  const handlerSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (values.password !== values.check_password) {
      setIsValidPasswords(false)
    } else {
      const { email, login, first_name, second_name, phone, password } = values

      const response = await dispatch(signup({ email, login, first_name, second_name, phone, password }))

      if (response.error) {
        console.log(response.error)
        dispatch(showSnackBar(response.error.message))
      } else {
        history.push(RoutersPaths.main)
      }
    }
  }

  const handlerToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(setIsSigninView())
  }

  const resetErrors = () => {
    if (!isValidPasswords) {
      setIsValidPasswords(true)
    }
  }

  useEffect(() => {
    if (
      !values.email ||
      !values.login ||
      !values.first_name ||
      !values.second_name ||
      !values.phone ||
      !values.password ||
      !values.check_password
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [values])

  return (
    <form className={styles.form} onSubmit={handlerSubmit}>
      <span className={styles.title}>Регистрация</span>
      <div className={styles.inputs}>
        <Input onChange={handlerChange} type="email" name="email" value={values.email} placeholder="Почта" />
        <Input onChange={handlerChange} type="text" name="login" value={values.login} placeholder="Логин" />
        <Input onChange={handlerChange} type="text" name="first_name" value={values.first_name} placeholder="Имя" />
        <Input
          onChange={handlerChange}
          type="text"
          name="second_name"
          value={values.second_name}
          placeholder="Фамилия"
        />
        <Input onChange={handlerChange} type="text" name="phone" value={values.phone} placeholder="Телефон" />
        <Input
          onChange={handlerChange}
          onFocus={resetErrors}
          type="password"
          name="password"
          value={values.password}
          placeholder="Пароль"
          isValid={isValidPasswords}
        />
        <Input
          onChange={handlerChange}
          onFocus={resetErrors}
          type="password"
          name="check_password"
          value={values.check_password}
          placeholder="Пароль (ещё раз)"
          isValid={isValidPasswords}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="submit" disabled={disabled}>
          Зарегистрироваться
        </Button>
        <Button onClick={handlerToggle} variant={ButtonVariant.SECONDARY}>
          Войти
        </Button>
      </div>
    </form>
  )
}
