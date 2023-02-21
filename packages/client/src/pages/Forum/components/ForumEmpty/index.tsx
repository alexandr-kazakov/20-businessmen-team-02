import React from 'react'
import styles from './styles.module.scss'

interface IComponent {
  text: string
}

export const ForumEmpty: React.FC<IComponent> = props => {
  const { text } = props

  return <p className={styles.empty}>{text}</p>
}
