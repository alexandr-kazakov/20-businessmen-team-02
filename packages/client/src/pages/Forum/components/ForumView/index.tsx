import React from 'react'
import { useAppSelector } from '../../../../app/redux/hooks'
import styles from './styles.module.scss'

export const ForumView: React.FC = () => {
  const { selectedForum } = useAppSelector(state => state.forum)

  return (
    <div className={styles.view}>
      {selectedForum ? (
        <>
          <div className={styles.row}>
            <span className={styles.title}>{selectedForum.title}</span>
            <time className={styles.date}>{selectedForum.date}</time>
          </div>
          <p className={styles.description}>{selectedForum.description}</p>
        </>
      ) : (
        <>
          <p className={styles.description}>Выберите форум</p>
        </>
      )}
    </div>
  )
}
