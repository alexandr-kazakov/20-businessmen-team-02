import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { getSelectedForum } from '../../redux/forumSlice'
import styles from './styles.module.scss'

export const ForumView: FC = () => {
  const selectedForum = useSelector(getSelectedForum)

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
        <p className={styles.description}>Выберите форум</p>
      )}
    </div>
  )
}
