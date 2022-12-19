import React from 'react'
import classnames from 'classnames'

import styles from './styles.module.scss'

interface ScoreProps {
  direction: 'acs' | 'desc'
  scores: number
}

export const Score: React.FC<ScoreProps> = ({ scores, direction }) => {
  const className = classnames(styles.scores, {
    [styles.scores_asc]: direction === 'acs',
    [styles.scores_desc]: direction === 'desc',
  })

  return <div className={className}>Scores: {scores}</div>
}
