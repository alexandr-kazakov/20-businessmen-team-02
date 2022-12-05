import { FC } from 'react'
import { Score } from '../Score/Score'
import { User } from '../../../../domain/intefaceses/user'
import styles from './styles.module.scss'

export type RankCardProps = User

export const RankCard: FC<RankCardProps> = ({ alias, scores, avatar, first_name, direction }: RankCardProps) => {
  return (
    <article className={styles.container}>
      <div className={styles.card}>
        <span className={styles.avatar}>
          <img src={avatar || '/avatar.svg'} alt="user"></img>
        </span>

        <p className={styles.name}> {alias || first_name}</p>
        <Score scores={scores} direction={direction} />
      </div>
    </article>
  )
}
