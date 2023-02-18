import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import { getComments, createComment, getSelectedTopic } from '../../redux/forumSlice'
import { ForumComments } from '../ForumComments'
import { ForumEmpty } from '../ForumEmpty'
import { Input } from '../../../../components/UI/Input'
import { Button } from '../../../../components/UI/Button'
import { purify } from '../../../../helpers'

import styles from './styles.module.scss'

export const ForumWindow: React.FC = () => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.auth)

  const selectedTopic = useSelector(getSelectedTopic)

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
      const comment = {
        id_topic: selectedTopic?.id,
        id_author: user?.id,
        login_author: user?.login,
        text: purify(value),
      }

      await dispatch(createComment(comment))
      await dispatch(getComments(selectedTopic?.id))

      setValue('')
    }
  }

  return (
    <div className={styles.window}>
      {selectedTopic ? (
        <>
          <div className={styles.header}>
            <div className={styles.row}>
              <span className={styles.title}>Топик: {purify(selectedTopic.title)}</span>
              <time className={styles.date}>{date}</time>
            </div>
            <p className={styles.description}>{purify(selectedTopic.description)}</p>
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
