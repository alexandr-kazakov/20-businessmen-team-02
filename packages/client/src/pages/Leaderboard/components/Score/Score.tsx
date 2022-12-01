import classnames from 'classnames'
import { FC } from 'react'
import styles from './styles.module.scss'
import { ScoreProps } from './type'

export const Score: FC<ScoreProps> = ({ scores, direction }: ScoreProps) => {
  const className = classnames(styles.scores, {
    [styles.scores_asc]: direction === 'acs',
    [styles.scores_desc]: direction === 'desc',
  })

  return (
    <div>
      <div className={className}>Scores: {scores}</div>
    </div>
  )
}
