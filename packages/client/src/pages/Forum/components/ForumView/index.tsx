import React from 'react'

import { useAppSelector } from '../../../../app/redux/hooks'
import { ForumCreate } from '../ForumCreate'
import { ForumWindow } from '../ForumWindow'

import styles from './styles.module.scss'

export const ForumView: React.FC = () => {
  const { isCreateTopic } = useAppSelector(state => state.forum)

  return <div className={styles.view}>{isCreateTopic ? <ForumCreate /> : <ForumWindow />}</div>
}
