import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import {
  getCommentsTopic,
  getAnswersComment,
  createComment,
  getSelectedTopic,
  getSelectedComment,
} from '../../redux/forumSlice'
import { ForumComments } from '../ForumComments'
import { ForumEmpty } from '../ForumEmpty'
import { Input } from '../../../../components/UI/Input'
import { Button } from '../../../../components/UI/Button'

import styles from './styles.module.scss'

export const ForumWindow: React.FC = () => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.auth)

  const selectedTopic = useSelector(getSelectedTopic)
  const selectedComment = useSelector(getSelectedComment)

  let date = null

  if (selectedTopic) {
    date = new Date(selectedTopic.createdAt).toLocaleDateString()
  }

  const [value, setValue] = useState('')

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handlerClick = async () => {
    if (value) {
      if (selectedComment) {
        const comment = {
          id_topic: selectedTopic?.id,
          id_comment: selectedComment.id,
          id_author: user?.id,
          login_author: user?.login,
          text: value,
        }

        await dispatch(createComment(comment))
        await dispatch(getAnswersComment(selectedComment.id))

        setValue('')
      } else {
        const comment = {
          id_topic: selectedTopic?.id,
          id_author: user?.id,
          login_author: user?.login,
          text: value,
        }

        await dispatch(createComment(comment))
        await dispatch(getCommentsTopic(selectedTopic?.id))

        setValue('')
      }
    }
  }

  return (
    <div className={styles.window}>
      {selectedTopic ? (
        <>
          <div className={styles.header}>
            <div className={styles.row}>
              <span className={styles.title}>Топик: {selectedTopic.title}</span>
              <time className={styles.date}>{date}</time>
            </div>
            <p className={styles.description}>{selectedTopic.description}</p>
            <ForumComments />
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
        <ForumEmpty text="Выберите топик" />
      )}
    </div>
  )
}
