import { FC } from 'react'
import styles from './styles.module.scss'
import classnames from 'classnames'

export interface LeaderCardProps {
  name: string
  scores: number
  variant: LeaderVariant
  avatar: string
}

export enum LeaderVariant {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
}

export const LeaderCard: FC<LeaderCardProps> = ({ name, scores, variant, avatar }: LeaderCardProps) => {
  const className = classnames(styles.leader, {
    [styles.leader_first]: variant === LeaderVariant.FIRST,
    [styles.leader_second]: variant === LeaderVariant.SECOND,
    [styles.leader_third]: variant === LeaderVariant.THIRD,
  })

  return (
    <div className={className}>
      <span className={styles.avatar}>
        <img src={avatar || '/avatar.svg'} alt="user"></img>
      </span>
      <p className={styles.name}>{name}</p>
      <p className={styles.score}>Score: {scores}</p>
    </div>
  )
}
