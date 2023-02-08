import React, { useState } from 'react'
import Picker from '@emoji-mart/react'

import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks'
import { getComments, createReaction } from '../../redux/forumSlice'
import { ForumEmoji } from '../ForumEmoji'

import type { IComment } from '../../types'

import styles from './styles.module.scss'

interface IComponent {
  comment: IComment
}

export const ForumComment: React.FC<IComponent> = props => {
  const { comment } = props

  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.auth)

  const [isEmoji, setIsEmoji] = useState(false)

  const toggleEmoji = () => {
    setIsEmoji(prev => !prev)
  }

  const onEmojiSelect = async (event: any) => {
    const reaction = {
      id_comment: comment.id,
      id_author: String(user?.id),
      value: event.native,
    }

    await dispatch(createReaction(reaction))
    await dispatch(getComments(comment.id_topic))

    toggleEmoji()
  }

  return (
    <div className={styles.comment}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <span className={styles.author}>{comment.login_author}</span>
        </div>
        <p className={styles.text}>{comment.text}</p>
      </div>
      <div className={styles.reactions}>
        <button className={styles.plus} onClick={toggleEmoji}>
          +
        </button>
        {comment.Reactions.length !== 0 && comment.Reactions.map(emoji => <ForumEmoji key={emoji.id} emoji={emoji} />)}
        {isEmoji && (
          <div className={styles.picker}>
            <Picker
              onEmojiSelect={onEmojiSelect}
              categories={['frequent']}
              searchPosition="none"
              navPosition="none"
              previewPosition="none"
              emojiButtonSize="20"
              emojiSize="16"
            />
          </div>
        )}
      </div>
    </div>
  )
}
