import React from 'react'
import { useAppSelector } from '../../../../app/redux/hooks'
import { ForumItem } from '../ForumItem'
import styles from './styles.module.scss'

export const ForumList: React.FC = () => {
  const { listForums } = useAppSelector(state => state.forum)

  return (
    <ul className={styles.list}>
      {listForums.length !== 0 ? (
        <>
          {listForums.map(forum => (
            <ForumItem key={forum.id} forum={forum} />
          ))}
        </>
      ) : (
        <p className={styles.empty}>Список пуст</p>
      )}
    </ul>
  )
}
