import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import { getCommentsTopic, setIsCreateTopic, setSelectedIdTopic, setSelectedIdComment } from '../../redux/forumSlice'

import type { TForum } from '../../types'

import styles from './styles.module.scss'

type Props = {
  topic: TForum
}

export const ForumItem: React.FC<Props> = ({ topic }) => {
  const dispatch = useAppDispatch()

  const { isCreateTopic, selectedIdTopic, selectedIdComment } = useAppSelector(state => state.forum)

  const date = new Date(topic.createdAt).toLocaleDateString()

  const handlerClick = async () => {
    if (isCreateTopic) {
      dispatch(setIsCreateTopic(false))
    }

    if (selectedIdComment) {
      dispatch(setSelectedIdComment(null))
    }

    if (selectedIdTopic !== topic.id) {
      await dispatch(getCommentsTopic(topic.id))
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
