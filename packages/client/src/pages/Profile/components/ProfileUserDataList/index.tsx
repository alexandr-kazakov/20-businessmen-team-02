import React, { useMemo } from 'react'

import { useAppSelector } from '../../../../app/redux/hooks'

import styles from './styles.module.scss'

export const ProfileUserDataList: React.FC = () => {
  const { listProfile } = useAppSelector(state => state.profile)

  const listNodes = useMemo(
    () =>
      Object.entries(listProfile[0]).map(([key, value]) => (
        <li key={key} className={styles.item}>
          <div className={styles.colLeft}>{key}</div>
          <div className={styles.colRight}>{value}</div>
        </li>
      )),
    [listProfile]
  )

  return (
    <ul className={`${styles.profile_user_data} clear-list`}>
      {listNodes.length ? listNodes : <p className={styles.empty}>Список пуст</p>}
    </ul>
  )
}
