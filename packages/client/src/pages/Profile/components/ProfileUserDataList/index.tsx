import React, { useMemo } from 'react'

import { useAppSelector } from '../../../../app/redux/hooks'
import type { IUserKey } from '../../../../pages/Auth/types'
import { profileForm } from '../../const'

import styles from './styles.module.scss'

export const ProfileUserDataList: React.FC = () => {
  const { profileView } = useAppSelector(state => state.profile)

  const userObj = useAppSelector(state => state.auth.user)

  const listNodes = useMemo(
    () =>
      userObj &&
      Object.entries(profileForm).map(([key, value]) => (
        <li key={key} className={styles.item}>
          <div className={styles.colLeft}>{value}</div>
          <div className={styles.colRight}>
            <input
              type="text"
              className={styles.userDataInput}
              name={key}
              defaultValue={userObj[key as IUserKey] || undefined}
              disabled={profileView}
            />
          </div>
        </li>
      )),
    [userObj, profileView]
  )

  return (
    <ul className={`clear-list ${styles.profile_user_data}`}>
      {listNodes && listNodes.length ? listNodes : <p className={styles.empty}>Список пуст</p>}
    </ul>
  )
}
