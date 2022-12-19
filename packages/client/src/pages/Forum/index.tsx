import React from 'react'

import { ForumList } from './components/ForumList'
import { ForumView } from './components/ForumView'

import styles from './styles.module.scss'

const ForumPage: React.FC = () => (
  <div className={styles.forum}>
    <ForumList />
    <ForumView />
  </div>
)

export default ForumPage
