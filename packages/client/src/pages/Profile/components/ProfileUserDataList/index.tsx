import React, { useCallback, useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { useAppSelector } from '../../../../app/redux/hooks'
import type { IUser, IUserKey } from '../../../../pages/Auth/types'
import { profileForm } from '../../const'
import { EMAIL_REGEXP, LOGIN_REGEXP, NAME_REGEXP, PHONE_REGEXP } from '../../../../lib/regexp'
import { Input } from '../../../../components/UI/Input'

import styles from './styles.module.scss'

const PATTERNS_VALIDATION: Record<string, RegExp> = {
  email: EMAIL_REGEXP,
  login: LOGIN_REGEXP,
  first_name: NAME_REGEXP,
  second_name: NAME_REGEXP,
  phone: PHONE_REGEXP,
}

export const ProfileUserDataList: React.FC = () => {
  const { profileView } = useAppSelector(state => state.auth)

  const { control } = useFormContext()

  const userObj = useAppSelector(state => state.auth.user)

  const getListNodes = useCallback(
    (user: IUser | null, view: boolean) =>
      user &&
      Object.entries(profileForm).map(([key, value]) => (
        <li key={key} className={styles.item}>
          <div className={styles.colLeft}>{value}</div>
          <div className={styles.colRight}>
            {!view && (
              <Controller
                name={key}
                control={control}
                rules={{ required: key !== 'display_name', pattern: PATTERNS_VALIDATION[key] }}
                defaultValue={user[key as IUserKey]}
                render={({ field, fieldState }) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Почта"
                    isValid={!(fieldState.error && 'error')}
                  />
                )}
              />
            )}
            {view && <div>{user[key as IUserKey]}</div>}
          </div>
        </li>
      )),
    [control]
  )

  const listNodes = useMemo(() => getListNodes(userObj, profileView), [getListNodes, userObj, profileView])

  return (
    <ul className={`clear-list ${styles.profile_user_data}`}>
      {listNodes && listNodes.length ? listNodes : <p className={styles.empty}>Список пуст</p>}
    </ul>
  )
}
