import React, { useEffect, useState, FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '@/app/redux/hooks'
import { signin, setIsSigninView } from '../../redux/authSlice'
import Input from '@/components/UI/Input'
import Button from '@/components/UI/Button'
import { IAuthSignin } from '../../types'
import { ButtonStyles } from '@/components/UI/Button/types'
import { RoutersPaths } from '@/components/Routers/types'
import styles from './styles.module.scss'

export const AuthSignin: FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [values, setValues] = useState<IAuthSignin>({ login: '', password: '' })
  const [disabled, setDisabled] = useState<boolean>(true)

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

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
        <Button variant={ButtonStyles.primary} type="submit" disabled={disabled}>
          Войти
        </Button>
        <Button onClick={handlerToggle} variant={ButtonStyles.secondary}>
          Нет аккаунта?
        </Button>
      </div>
    </form>
  )
}
