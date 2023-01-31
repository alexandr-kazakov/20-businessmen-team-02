import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import { createComment, getSelectedForum } from '../../redux/forumSlice'
import { Input } from '../../../../components/UI/Input'
import { Button } from '../../../../components/UI/Button'

import styles from './styles.module.scss'

export const ForumWindow: React.FC = () => {
  const dispatch = useAppDispatch()

  const { commentsTopic } = useAppSelector(state => state.forum)
  const selectedForum = useSelector(getSelectedForum)

  // console.log(selectedForum)

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
        id_author: selectedForum?.id_author,
        text: value,
        likes: 0,
      }

      await dispatch(createComment(comment))

      setValue('')
    }
  }

  return (
    <>
      {selectedForum ? (
        <div className={styles.window}>
          <div className={styles.header}>
            <div className={styles.row}>
              <span className={styles.title}>{selectedForum.title}</span>
              <time className={styles.date}>{date}</time>
            </div>
            <p className={styles.description}>{selectedForum.description}</p>
            <div className={styles.comments}>
              {commentsTopic.length !== 0 &&
                commentsTopic.map((comment: any) => (
                  <div key={comment.id} className={styles.comment}>
                    <p>{comment.text}</p>
                    <span>Лайков: {comment.likes}</span>
                  </div>
                ))}
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
        </div>
      ) : (
        <p className={styles.description}>Выберите топик</p>
      )}
    </>
  )
}
