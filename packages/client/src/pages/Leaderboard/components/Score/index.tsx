import React from 'react'
import classnames from 'classnames'
import type { Rate } from '../../types/user-rates'

import styles from './styles.module.scss'

type ScoreProps = Rate

export const Score: React.FC<ScoreProps> = ({ scores, direction }) => {
  const className = classnames(styles.scores, {
    [styles.scores_asc]: direction === 'acs',
    [styles.scores_desc]: direction === 'desc',
  })

  return <div className={className}>Scores: {scores}</div>
}
