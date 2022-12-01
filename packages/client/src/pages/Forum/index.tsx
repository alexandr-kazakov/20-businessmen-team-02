import React, { FC } from 'react'
import { ForumList } from './components/ForumList'
import { ForumView } from './components/ForumView'
import styles from './styles.module.scss'

const ForumPage: FC = () => {
  return (
    <div className={styles.forum}>
      <ForumList />
      <ForumView />
    </div>
  )
}

export default ForumPage
