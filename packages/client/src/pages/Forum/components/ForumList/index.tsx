import React, { useMemo } from 'react'

import { useAppSelector } from '@/app/redux/hooks'
import { ForumItem } from '../ForumItem'

import styles from './styles.module.scss'

export const ForumList: React.FC = () => {
  const { listForums } = useAppSelector(state => state.forum)

  const listNodes = useMemo(() => listForums.map(forum => <ForumItem key={forum.id} forum={forum} />), [listForums])

  return <ul className={styles.list}>{listNodes.length ? listNodes : <p className={styles.empty}>Список пуст</p>}</ul>
}
