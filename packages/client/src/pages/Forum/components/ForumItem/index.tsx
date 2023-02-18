import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import { getComments, setIsCreateTopic } from '../../redux/forumSlice'
import { purify } from '../../../../helpers'

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
    }
  }

  return (
    <li className={styles.item} onClick={handlerClick}>
      <div className={styles.row}>
        <span className={styles.title}>{purify(topic.title)}</span>
        <time className={styles.date}>{date}</time>
      </div>
      <p className={styles.description}>{topic.description}</p>
    </li>
  )
}
