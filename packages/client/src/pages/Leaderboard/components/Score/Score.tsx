import classnames from 'classnames'
import { FC } from 'react'
import styles from './styles.module.scss'

interface ScoreProps {
  direction: 'acs' | 'desc'
  scores: number
}

export const Score: FC<ScoreProps> = ({ scores, direction }: ScoreProps) => {
  const className = classnames(styles.scores, {
    [styles.scores_asc]: direction === 'acs',
    [styles.scores_desc]: direction === 'desc',
  })

  return <div className={className}>Scores: {scores}</div>
}
