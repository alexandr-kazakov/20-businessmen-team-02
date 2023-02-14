import React, { useCallback, useMemo, useState } from 'react'

import { Button } from '../../components/UI/Button'
import { Input } from '../../components/UI/Input'

import { useAppSelector } from '../../app/redux/hooks'
import { api } from '../../app/api'

import styles from './styles.module.scss'

const INIT_VALUES = {
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
}

const ChangePassword: React.FC = () => {
  const [values, setValues] = useState(INIT_VALUES)

  const { user } = useAppSelector(state => state.auth)

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      try {
        const { newPassword, oldPassword } = values
        await api.put('user/password/', { login: user?.login, newPassword, oldPassword })
        /** TODO: показывать успешное выполнение в <Snackbar/> */
      } catch (e) {
        /** TODO: показывать ошибку в <Snackbar/> */
        console.error(e)
      }
    },
    [user, values]
  )

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setValues({
        ...values,
        [name]: value,
      })
    },
    [values]
  )

  /** TODO: прикрутить нормальную валидацию после уточнения требований */
  const disabled = useMemo(
    () =>
      !values.newPassword ||
      !values.oldPassword ||
      !values.repeatPassword ||
      values.newPassword !== values.repeatPassword,
    [values]
  )

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <span className={styles.title}>Изменить пароль</span>
        <div className={styles.inputs}>
          <Input
            onChange={onChange}
            type="password"
            name="oldPassword"
            placeholder="Старый пароль"
            value={values.oldPassword}
          />
          <Input
            onChange={onChange}
            type="password"
            name="newPassword"
            placeholder="Новый пароль"
            value={values.newPassword}
          />
          <Input
            onChange={onChange}
            type="password"
            name="repeatPassword"
            placeholder="Повторить новый пароль"
            value={values.repeatPassword}
          />
        </div>
        <div className={styles.buttons}>
          <Button disabled={disabled} type="submit">
            Изменить пароль
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
