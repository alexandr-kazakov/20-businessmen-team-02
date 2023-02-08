import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import { getComments, setIsCreateTopic, setSelectedIdTopic } from '../../redux/forumSlice'

import type { ITopic } from '../../types'

import styles from './styles.module.scss'

type Props = {
  topic: ITopic
}

export const ForumItem: React.FC<Props> = ({ topic }) => {
  const dispatch = useAppDispatch()

  const { isCreateTopic, selectedIdTopic } = useAppSelector(state => state.forum)

  const date = new Date(topic.createdAt).toLocaleDateString()

  const handlerClick = async () => {
    if (isCreateTopic) {
      dispatch(setIsCreateTopic(false))
    }

    if (selectedIdTopic !== topic.id) {
      await dispatch(getComments(topic.id))
      dispatch(setSelectedIdTopic(topic.id))
    }
  }

  return (
    <li className={styles.item} onClick={handlerClick}>
      <div className={styles.row}>
        <span className={styles.title}>{topic.title}</span>
        <time className={styles.date}>{date}</time>
      </div>
      <p className={styles.description}>{topic.description}</p>
    </li>
  )
}
