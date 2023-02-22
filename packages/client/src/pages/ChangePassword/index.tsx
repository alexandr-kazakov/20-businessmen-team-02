import React from 'react'
import { Controller, type FieldValues, useForm } from 'react-hook-form'
import { showSnackBar } from '../../components/Snackbar/redux/snackbarSlice'

import { PASSWORD_REGEXP } from '../../lib/regexp'
import { Button } from '../../components/UI/Button'
import { Input } from '../../components/UI/Input'
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks'
import { api } from '../../app/api'

import styles from './styles.module.scss'

const INIT_VALUES = {
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
}

const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)

  const { control, handleSubmit, watch } = useForm({ defaultValues: INIT_VALUES })

  const onSubmit = async (data: FieldValues): Promise<void> => {
    try {
      const { newPassword, oldPassword } = data
      await api.put('user/password/', { login: user?.login, newPassword, oldPassword })
    } catch (e) {
      dispatch(showSnackBar('Что то пошло не так...'))
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.title}>Изменить пароль</span>
        <div className={styles.inputs}>
          <Controller
            name="oldPassword"
            control={control}
            rules={{ required: true, pattern: PASSWORD_REGEXP }}
            render={({ field, fieldState }) => (
              <Input
                type="password"
                value={field.value}
                onChange={field.onChange}
                placeholder="Старый пароль"
                isValid={!(fieldState.error && 'error')}
              />
            )}
          />

          <Controller
            name="newPassword"
            control={control}
            rules={{ required: true, pattern: PASSWORD_REGEXP }}
            render={({ field, fieldState }) => (
              <Input
                type="password"
                value={field.value}
                onChange={field.onChange}
                placeholder="Новый пароль"
                isValid={!(fieldState.error && 'error')}
              />
            )}
          />

          <Controller
            name="repeatPassword"
            control={control}
            rules={{
              required: true,
              pattern: PASSWORD_REGEXP,
              validate: val => watch('newPassword') === val,
            }}
            render={({ field, fieldState }) => (
              <Input
                type="password"
                value={field.value}
                onChange={field.onChange}
                placeholder="Повторить новый пароль"
                isValid={!(fieldState.error && 'error')}
              />
            )}
          />
        </div>
        <div className={styles.buttons}>
          <Button type="submit">Изменить пароль</Button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
