import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import { getAnswersComment, getSelectedComment } from '../../redux/forumSlice'
import { ForumComment } from '../ForumComment'
import { ForumEmpty } from '../ForumEmpty'

import styles from './styles.module.scss'

export const ForumComments: React.FC = () => {
  const dispatch = useAppDispatch()

  const { commentsTopic } = useAppSelector(state => state.forum)

  const selectedComment = useSelector(getSelectedComment)

  const [comments, setComments] = useState([])

  const loadComments = useCallback(async () => {
    const res = await dispatch(getAnswersComment(selectedComment.id))
    setComments(res.payload.data)
  }, [selectedComment, dispatch])

  useEffect(() => {
    if (selectedComment) {
      loadComments()
    }
  }, [selectedComment, loadComments])

  return (
    <div className={styles.comments}>
      {selectedComment ? (
        <>
          <ForumComment comment={selectedComment} />
          <div className={styles.answers}>
            {comments.length === 0 ? (
              <div className={styles.wrapper}>
                <ForumEmpty text="Ответы на этот коммент отсутствуют" />
              </div>
            ) : (
              <div className={styles.container}>
                {comments.map((comment: any) => (
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
