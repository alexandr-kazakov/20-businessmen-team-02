import React, { useMemo } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import { setIsCreateTopic } from '../../redux/forumSlice'
import { ForumItem } from '../ForumItem'
import { Button } from '../../../../components/UI/Button'

import styles from './styles.module.scss'

export const ForumList: React.FC = () => {
  const dispatch = useAppDispatch()

  const { isCreateTopic, topicsList } = useAppSelector(state => state.forum)

  const handlerClick = () => {
    if (isCreateTopic) {
      dispatch(setIsCreateTopic(false))
    } else {
      dispatch(setIsCreateTopic(true))
    }
  }

  const listNodes = useMemo(() => topicsList.map(topic => <ForumItem key={topic.id} topic={topic} />), [topicsList])

  return (
    <div className={styles.conainer}>
      <div className={styles.wrapper}>
        <Button onClick={handlerClick}>Создать топик</Button>
      </div>
      <ul className={styles.list}>{listNodes.length ? listNodes : <p className={styles.empty}>Список пуст</p>}</ul>
    </div>
  )
}
