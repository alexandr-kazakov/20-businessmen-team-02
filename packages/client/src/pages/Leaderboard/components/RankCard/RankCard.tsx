import { FC } from 'react'
import { RankCardProps } from './type'
import { Score } from '../Score/Score'
import styles from './styles.module.scss'

export const RankCard: FC<RankCardProps> = ({ alias, scores, avatar, first_name, direction }: RankCardProps) => {
  return (
    <article className={styles.container}>
      <div className={styles.box}>
        <span className={styles.avatar}>
          <img src={avatar ? avatar : '/avatar.svg'} alt="user"></img>
        </span>

        <p className={styles.fullname}> {alias || first_name}</p>
        <Score scores={scores} direction={direction} />
      </div>
    </article>
  )
}
