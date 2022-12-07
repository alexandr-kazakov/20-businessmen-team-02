import React, { useEffect, useState, FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '@/app/redux/hooks'
import { signup, setIsSigninView } from '../../redux/authSlice'
import Input from '@/components/UI/Input'
import Button from '@/components/UI/Button'
import { IAuthSignup } from '../../types'
import { ButtonStyles } from '@/components/UI/Button/types'
import styles from './styles.module.scss'

interface IValues extends IAuthSignup {
  check_password: string
}

export const AuthSignup: FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [values, setValues] = useState<IValues>({
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
    check_password: '',
  })
  const [disabled, setDisabled] = useState<boolean>(true)
  const [isValidPasswords, setIsValidPasswords] = useState<boolean>(true)

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handlerSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      if (values.password !== values.check_password) {
        setIsValidPasswords(false)
      } else {
        const { email, login, first_name, second_name, phone, password } = values
        await dispatch(signup({ email, login, first_name, second_name, phone, password }))
        history.push('/')
      }
    } catch (error) {
      console.log(error)
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
        <Button variant={ButtonStyles.primary} type="submit" disabled={disabled}>
          Авторизоваться
        </Button>
        <Button onClick={handlerToggle} variant={ButtonStyles.secondary}>
          Нет аккаунта?
        </Button>
      </div>
    </form>
  )
}
