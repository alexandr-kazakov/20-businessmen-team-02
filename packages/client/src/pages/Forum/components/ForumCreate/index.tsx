import React, { useCallback, useState } from 'react'
import classnames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import { getAllTopics, postTopic, setIsCreateTopic } from '../../redux/forumSlice'
import { Input } from '../../../../components/UI/Input'
import { Button } from '../../../../components/UI/Button'

import styles from './styles.module.scss'

export const ForumCreate: React.FC = () => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.auth)

  const [values, setValues] = useState({ title: '', description: '' })
  const [isValidTitle, setIsValidTitle] = useState(true)
  const [isValidDescription, setIsValidDescription] = useState(true)

  const className = classnames(styles.description, {
    [styles.error]: !isValidDescription,
  })

  const handlerChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target

      if (!isValidTitle) {
        setIsValidTitle(true)
      }

      setValues({ ...values, [name]: value })
    },
    [values, isValidTitle]
  )

  const handlerChangeDescription = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = event.target

      if (!isValidDescription) {
        setIsValidDescription(true)
      }

      setValues({ ...values, [name]: value })
    },
    [values, isValidDescription]
  )

  const handlerSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!values.title || !values.description) {
      if (!values.title) {
        setIsValidTitle(false)
      }

      if (!values.description) {
        setIsValidDescription(false)
      }
    } else {
      const topic = {
        id_author: user?.id,
        title: values.title,
        description: values.description,
      }

      await dispatch(postTopic(topic))
      await dispatch(getAllTopics())

      dispatch(setIsCreateTopic(false))
    }
  }

  return (
    <form className={styles.form} onSubmit={handlerSubmit}>
      <div className={styles.column}>
        <Input
          className={styles.title}
          onChange={handlerChangeTitle}
          type="text"
          name="title"
          value={values.title}
          placeholder="Название"
          isValid={isValidTitle}
        />
        <textarea
          className={className}
          onChange={handlerChangeDescription}
          name="description"
          value={values.description}
          placeholder="Описание"
        />
      </div>
      <Button>Опубликовать</Button>
    </form>
  )
}
