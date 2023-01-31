import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import { getAllComments, createComment, getSelectedForum } from '../../redux/forumSlice'
import { ForumComment } from '../ForumComment'
import { Input } from '../../../../components/UI/Input'
import { Button } from '../../../../components/UI/Button'

import styles from './styles.module.scss'

export const ForumWindow: React.FC = () => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.auth)
  const { commentsTopic } = useAppSelector(state => state.forum)
  const selectedForum = useSelector(getSelectedForum)

  let date = null

  if (selectedForum) {
    date = new Date(selectedForum.createdAt).toLocaleDateString()
  }

  const [value, setValue] = useState('')

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handlerClick = async () => {
    if (value) {
      const comment = {
        id_topic: selectedForum?.id,
        id_author: user?.id,
        text: value,
      }

      await dispatch(createComment(comment))
      await dispatch(getAllComments(selectedForum?.id))

      setValue('')
    }
  }

  return (
    <div className={styles.window}>
      {selectedForum ? (
        <>
          <div className={styles.header}>
            <div className={styles.row}>
              <span className={styles.title}>{selectedForum.title}</span>
              <time className={styles.date}>{date}</time>
            </div>
            <p className={styles.description}>{selectedForum.description}</p>
            <div className={styles.comments}>
              {commentsTopic.length === 0 ? (
                <p className={styles.description}>Комментов нет</p>
              ) : (
                commentsTopic.map((comment: any) => <ForumComment key={comment.id} comment={comment} />)
              )}
            </div>
          </div>
          <div className={styles.footer}>
            <Input
              className={styles.input}
              onChange={handlerChange}
              type="text"
              name="comment"
              value={value}
              placeholder="Написать коммент"
            />
            <Button className={styles.button} onClick={handlerClick}>
              Отправить
            </Button>
          </div>
        </>
      ) : (
        <p className={styles.description}>Выберите топик</p>
      )}
    </div>
  )
}
