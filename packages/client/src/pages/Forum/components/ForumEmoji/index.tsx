import React from 'react'

import styles from './styles.module.scss'

interface IComponent {
  emoji: any
}

export const ForumEmoji: React.FC<IComponent> = props => {
  const { emoji } = props

  return <div className={styles.emoji}>{emoji.value}</div>
}
