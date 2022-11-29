import React from 'react'
import { ForumItem } from '../ForumItem'
import { list } from '../../const'
import styles from './styles.module.scss'

export const ForumList: React.FC = () => {
  return (
    <ul className={styles.list}>
      {list.map(forum => (
        <ForumItem key={forum.id} forum={forum} />
      ))}
    </ul>
  )
}
