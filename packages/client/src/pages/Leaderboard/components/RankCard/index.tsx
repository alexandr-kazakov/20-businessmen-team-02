import React from 'react'
import { Score } from '../Score'
import { getURL } from '@/app/api'
import type { UserRate } from '../../types/user-rates'

import styles from './styles.module.scss'

export type RankCardProps = UserRate

export const RankCard: React.FC<RankCardProps> = ({ avatar, scores, direction, display_name }) => {
  return (
    <article className={styles.container}>
      <div className={styles.card}>
        <span className={styles.avatar}>
          <img src={avatar ? getURL(`resources/${avatar}`) : '/avatar.svg'} alt="user" />
        </span>
        <p className={styles.name}> {display_name || 'incognito user'}</p>
        <Score scores={scores} direction={direction} />
      </div>
    </article>
  )
}
