import React, { useEffect } from 'react'

import { useAppDispatch } from '../../app/redux/hooks'
import { getAllTopics } from './redux/forumSlice'
import { ForumList } from './components/ForumList'
import { ForumView } from './components/ForumView'

import styles from './styles.module.scss'

const ForumPage: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllTopics())
  }, [dispatch])

  return (
    <div className={styles.forum}>
      <ForumList />
      <ForumView />
    </div>
  )
}

export default ForumPage
