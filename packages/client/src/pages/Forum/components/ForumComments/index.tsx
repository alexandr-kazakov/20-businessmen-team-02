import React from 'react'

import { useAppSelector } from '../../../../app/redux/hooks'
import { ForumComment } from '../ForumComment'
import { ForumEmpty } from '../ForumEmpty'

import styles from './styles.module.scss'

export const ForumComments: React.FC = () => {
  const { commentsTopic } = useAppSelector(state => state.forum)

  return (
    <div className={styles.comments}>
      {commentsTopic.length === 0 ? (
        <ForumEmpty text="Комментов нет" />
      ) : (
        commentsTopic.map(comment => <ForumComment key={comment.id} comment={comment} />)
      )}
    </div>
  )
}
