import React from 'react'
import classnames from 'classnames'
import type { UserRate } from '../../types/user-rates'
import { getURL } from '@/app/api'

import styles from './styles.module.scss'

type LeaderCardProps = UserRate & {
  variant: LeaderVariant
}

export enum LeaderVariant {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
}

export const LeaderCard: React.FC<LeaderCardProps> = ({ display_name, scores, variant, avatar }) => {
  const className = classnames(styles.leader, {
    [styles.leader_first]: variant === LeaderVariant.FIRST,
    [styles.leader_second]: variant === LeaderVariant.SECOND,
    [styles.leader_third]: variant === LeaderVariant.THIRD,
  })

  return (
    <div className={className}>
      <span className={styles.avatar}>
        <img src={avatar ? getURL(`resources/${avatar}`) : '/avatar.svg'} alt="user" />
      </span>
      <p className={styles.name}>{display_name}</p>
      <p className={styles.score}>Score: {scores}</p>
    </div>
  )
}
