import React, { useMemo } from 'react'

import { useAppSelector } from '../../../../app/redux/hooks'

import styles from './styles.module.scss'

export const ProfileUserDataList: React.FC = () => {
  const { profilenView } = useAppSelector(state => state.profile)

  const userObj = useAppSelector(state => state.auth.user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const editeduserObj: any = {}
 // @ts-ignore: Unreachable code error
  Object.entries(userObj).map(([key, value]) => {
    if (key === 'first_name') {
      editeduserObj['Имя'] = value
    } else if (key === 'second_name') {
      editeduserObj['Фамилия'] = value
    } else if (key === 'display_name') {
      editeduserObj['Ник'] = value
    } else if (key === 'login') {
      editeduserObj['Логин'] = value
    } else if (key === 'phone') {
      editeduserObj['Телефон'] = value
    } else if (key === 'email') {
      editeduserObj['Емайл'] = value
    }
  })

  const listNodes = useMemo(
    () =>
      Object.entries(editeduserObj).map(([key, value]) => (
        <li key={key} className={styles.item}>
          <div className={styles.colLeft}>{key}</div>
          <div className={styles.colRight}>
            {/* 
              // @ts-ignore */}
            <input className={styles.userDataInput} type="text" defaultValue={value} disabled={profilenView} />
          </div>
        </li>
      )),
    [editeduserObj, profilenView]
  )

  return (
    <ul className={`clear-list ${styles.profile_user_data}`}>
      {listNodes.length ? listNodes : <p className={styles.empty}>Список пуст</p>}
    </ul>
  )
}
