import React from 'react'
import { useHistory } from 'react-router-dom'
import { Controller, type FieldValues, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../../../app/redux/hooks'

import { EMAIL_REGEXP, NAME_REGEXP, LOGIN_REGEXP, PHONE_REGEXP, PASSWORD_REGEXP } from '../../../../lib/regexp'
import { signup, setIsSigninView } from '../../redux/authSlice'
import { showSnackBar } from '../../../../components/Snackbar/redux/snackbarSlice'
import { Input } from '../../../../components/UI/Input'
import { Button, ButtonVariant } from '../../../../components/UI/Button'
import { RoutersPaths } from '../../../../components/Routers/types'

import styles from './styles.module.scss'

const INIT_VALUES = {
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

  const { control, handleSubmit, watch } = useForm({ defaultValues: INIT_VALUES })

  const onSubmit = async (data: FieldValues): Promise<void> => {
    const response = await dispatch(signup(data))

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

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <span className={styles.title}>Регистрация</span>
      <div className={styles.inputs}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true, pattern: EMAIL_REGEXP }}
          render={({ field, fieldState }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="Почта"
              isValid={!(fieldState.error && 'error')}
            />
          )}
        />

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
          name="first_name"
          control={control}
          rules={{ required: true, pattern: NAME_REGEXP }}
          render={({ field, fieldState }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="Имя"
              isValid={!(fieldState.error && 'error')}
            />
          )}
        />

        <Controller
          name="second_name"
          control={control}
          rules={{ required: true, pattern: NAME_REGEXP }}
          render={({ field, fieldState }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="Фамилия"
              isValid={!(fieldState.error && 'error')}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          rules={{ required: true, pattern: PHONE_REGEXP }}
          render={({ field, fieldState }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="Телефон"
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

        <Controller
          name="check_password"
          control={control}
          rules={{
            required: true,
            pattern: PASSWORD_REGEXP,
            validate: val => watch('password') === val,
          }}
          render={({ field, fieldState }) => (
            <Input
              type="password"
              value={field.value}
              onChange={field.onChange}
              placeholder="Пароль (ещё раз)"
              isValid={!(fieldState.error && 'error')}
            />
          )}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="submit">Зарегистрироваться</Button>
        <Button onClick={handlerToggle} variant={ButtonVariant.SECONDARY}>
          Войти
        </Button>
      </div>
    </form>
  )
}
