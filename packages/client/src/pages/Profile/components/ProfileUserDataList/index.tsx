import React, { useMemo } from 'react'

import { useAppSelector } from '../../../../app/redux/hooks'

import styles from './styles.module.scss'

export const ProfileUserDataList: React.FC = () => {
  const { profileView } = useAppSelector(state => state.profile)

  const userObj: any = useAppSelector(state => state.auth.user)

  const listNodes = useMemo(
    () =>
      Object.entries(userObj).map(([key, value]: any[]) => (
        <li key={key} className={styles.item}>
          <div className={styles.colLeft}>{key}</div>
          <div className={styles.colRight}>
            <input className={styles.userDataInput} type="text" defaultValue={value} disabled={profileView} />
          </div>
        </li>
      )),
    [userObj, profileView]
  )

  return (
    <ul className={`clear-list ${styles.profile_user_data}`}>
      {listNodes.length ? listNodes : <p className={styles.empty}>Список пуст</p>}
    </ul>
  )
}
