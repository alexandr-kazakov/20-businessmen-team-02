import React, { useMemo } from 'react'

import { useAppSelector } from '../../../../app/redux/hooks'
import type { IUser, IUserKey } from '../../../../pages/Auth/types'
import { profileForm } from '../../const'

import styles from './styles.module.scss'

export const ProfileUserDataList: React.FC = () => {
  const { profileView } = useAppSelector(state => state.auth)

  const userObj = useAppSelector(state => state.auth.user)

  const getListNodes = (user: IUser | null, view: boolean) =>
    user &&
    Object.entries(profileForm).map(([key, value]) => (
      <li key={key} className={styles.item}>
        <div className={styles.colLeft}>{value}</div>
        <div className={styles.colRight}>
          <input
            type="text"
            className={styles.userDataInput}
            name={key}
            defaultValue={user[key as IUserKey] || undefined}
            disabled={view}
          />
        </div>
      </li>
    ))

  const listNodes = useMemo(() => getListNodes(userObj, profileView), [userObj, profileView])

  return (
    <ul className={`clear-list ${styles.profile_user_data}`}>
      {listNodes && listNodes.length ? listNodes : <p className={styles.empty}>Список пуст</p>}
    </ul>
  )
}
