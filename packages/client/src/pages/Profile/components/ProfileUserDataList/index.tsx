import React, { FC } from 'react'
import { useAppSelector } from '../../../../app/redux/hooks'
import styles from './styles.module.scss'

export const ProfileUserDataList: FC = () => {
  const { listProfile } = useAppSelector(state => state.profile)

  return (
    <ul className={`${styles.profile_user_data} clear-list`}>
      {listProfile.length !== 0 ? (
        <>
          { Object.entries(listProfile[0]).map(([key, value]) => (
            <li className={styles.profile_user_data__item}>
                <div className={`${styles.profileuser_data__item_col} ${styles.profile_user_data__item_col_left}`}>{key}</div>
                <div className={`${styles.profile_user_data__item_col} ${styles.profile_user_data__item_col_right}`}>{value}</div>
            </li>
          ))}
        </>
      ) : (
        <p className={styles.empty}>Список пуст</p>
      )}
    </ul>
  )
}
