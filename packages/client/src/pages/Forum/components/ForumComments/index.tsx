import React from 'react'

import { useAppSelector } from '../../../../app/redux/hooks'
import { ForumComment } from '../ForumComment'
import { ForumEmpty } from '../ForumEmpty'

import styles from './styles.module.scss'

export const ForumComments: React.FC = () => {
  const { commentsTopic, selectedComment } = useAppSelector(state => state.forum)

  return (
    <div className={styles.comments}>
      {selectedComment ? (
        <>
          <ForumComment comment={selectedComment} />
          <div className={styles.answers}>
            {selectedComment.Comments.length === 0 ? (
              <div className={styles.wrapper}>
                <ForumEmpty text="Ответы на этот коммент отсутствуют" />
              </div>
            ) : (
              <div className={styles.container}>
                {selectedComment.Comments.map((comment: any) => (
                  <ForumComment key={comment.id} comment={comment} />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {commentsTopic.length === 0 ? (
            <ForumEmpty text="Комментов нет" />
          ) : (
            commentsTopic.map((comment: any) => <ForumComment key={comment.id} comment={comment} />)
          )}
        </>
      )}
    </div>
  )
}
