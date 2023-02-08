import React from 'react'

import type { IReaction } from '../../types'

import styles from './styles.module.scss'

interface IComponent {
  emoji: IReaction
}

export const ForumEmoji: React.FC<IComponent> = props => {
  const { emoji } = props

  return <div className={styles.emoji}>{emoji.value}</div>
}
