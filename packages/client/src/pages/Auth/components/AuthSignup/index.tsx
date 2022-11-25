import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../app/redux/hooks'
import { signup, setIsSigninView } from '../../redux/authSlice'
import Input from '../../../../components/UI/Input'
import Button from '../../../../components/UI/Button'
import styles from './styles.module.scss'

export const AuthSignup = () => {
  const dispatch = useAppDispatch()
  const [values, setValues] = useState({
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
    check_password: '',
  })
  const [disabled, setDisabled] = useState(true)
  const [isValidPasswords, setIsValidPasswords] = useState(true)

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (values.password !== values.check_password) {
      setIsValidPasswords(false)
    } else {
      const { email, login, first_name, second_name, phone, password } = values
      dispatch(
        signup({ email, login, first_name, second_name, phone, password })
      )
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
        <Input
          onChange={handlerChange}
          type="email"
          name="email"
          value={values.email}
          placeholder="Почта"
        />
        <Input
          onChange={handlerChange}
          type="text"
          name="login"
          value={values.login}
          placeholder="Логин"
        />
        <Input
          onChange={handlerChange}
          type="text"
          name="first_name"
          value={values.first_name}
          placeholder="Имя"
        />
        <Input
          onChange={handlerChange}
          type="text"
          name="second_name"
          value={values.second_name}
          placeholder="Фамилия"
        />
        <Input
          onChange={handlerChange}
          type="text"
          name="phone"
          value={values.phone}
          placeholder="Телефон"
        />
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
        <Button primary disabled={disabled}>
          Авторизоваться
        </Button>
        <Button onClick={handlerToggle} secondary>
          Нет аккаунта?
        </Button>
      </div>
    </form>
  )
}
