import React, { useState } from 'react'
import { useAppDispatch } from '../../../../app/redux/hooks'
import { setIsSignin } from '../../redux/authSlice'
import Input from '../../../../components/UI/Input'
import Button from '../../../../components/UI/Button'
import styles from './styles.module.scss'

export const AuthSignin = () => {
  const dispatch = useAppDispatch()
  const [values, setValues] = useState({ login: '', password: '' })

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(values)
  }

  const handlerToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(setIsSignin())
  }

  return (
    <form className={styles.form} onSubmit={handlerSubmit}>
      <span className={styles.title}>Вход</span>
      <div className={styles.inputs}>
        <Input
          className={styles.input}
          onChange={handlerChange}
          type="text"
          name="login"
          value={values.login}
          placeholder="Логин"
        />
        <Input
          className={styles.input}
          onChange={handlerChange}
          type="password"
          name="password"
          value={values.password}
          placeholder="Пароль"
        />
      </div>
      <div className={styles.buttons}>
        <Button className={`${styles.button} ${styles.button_primary}`}>
          Авторизоваться
        </Button>
        <Button
          className={`${styles.button} ${styles.button_secondary}`}
          onClick={handlerToggle}>
          Нет аккаунта?
        </Button>
      </div>
    </form>
  )
}
