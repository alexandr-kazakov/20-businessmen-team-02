import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { setSelectedIdForum } from '../../redux/forumSlice'

import type { TForum } from '../../types'

import styles from './styles.module.scss'

type Props = {
  forum: TForum
}

export const ForumItem: React.FC<Props> = ({ forum }) => {
  const dispatch = useAppDispatch()
  const { selectedIdForum } = useAppSelector(state => state.forum)

  const handlerClick = () => {
    if (selectedIdForum !== forum.id) {
      dispatch(setSelectedIdForum(forum.id))
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
