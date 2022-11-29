import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import { setSelectedForum } from '../../redux/forumSlice'
import { ForumType } from '../../types'
import styles from './styles.module.scss'

interface IComponent {
  forum: ForumType
}

export const ForumItem: React.FC<IComponent> = props => {
  const { forum } = props

  const dispatch = useAppDispatch()
  const { selectedForum } = useAppSelector(state => state.forum)

  const handlerClick = () => {
    if (!selectedForum) {
      dispatch(setSelectedForum(forum))
    } else {
      if (selectedForum.id !== forum.id) {
        dispatch(setSelectedForum(forum))
      }
    }
  }

  return (
    <li className={styles.item} onClick={handlerClick}>
      <div className={styles.row}>
        <span className={styles.title}>{forum.title}</span>
        <time className={styles.date}>{forum.date}</time>
      </div>
      <p className={styles.description}>{forum.description}</p>
    </li>
  )
}
