import { FC } from 'react'
import styles from './styles.module.scss'
import classnames from 'classnames'
import { LeaderCardProps } from './type'
import { LeaderVarian } from './type'

export const LeaderCard: FC<LeaderCardProps> = ({ name, scores, variant }: LeaderCardProps) => {
  const className = classnames(styles.leader, {
    [styles.leader_first]: variant === LeaderVarian.FIRST,
    [styles.leader_second]: variant === LeaderVarian.SECOND,
    [styles.leader_third]: variant === LeaderVarian.THIRD,
  })

  return (
    <div className={className}>
      <span className={styles.avatar}>
        <img src="/avatar.svg" alt="user"></img>
      </span>
      <p className={styles.name}>{name}</p>
      <p className={styles.score}>Score: {scores}</p>
    </div>
  )
}
