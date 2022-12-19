import React from 'react'
import { Link } from 'react-router-dom'

import { LeaderCard, LeaderVariant, type LeaderCardProps } from '../LeaderCard'

import type { User } from '../../../../domain/intefaceses/user'

import styles from './styles.module.scss'

interface LeadersProps {
  users: User[]
}

export const Leaders: React.FC<LeadersProps> = ({ users: [firstUser, secondUser, thirdUser] }) => {
  const firstLeader: LeaderCardProps = {
    name: firstUser.alias || firstUser.first_name,
    scores: firstUser.scores,
    variant: LeaderVariant.FIRST,
    avatar: firstUser.avatar ?? '',
  }

  const secondLeader: LeaderCardProps = {
    name: secondUser.alias || secondUser.first_name,
    scores: secondUser.scores,
    variant: LeaderVariant.SECOND,
    avatar: secondUser.avatar ?? '',
  }

  const thirdLeader: LeaderCardProps = {
    name: thirdUser.alias || thirdUser.first_name,
    scores: thirdUser.scores,
    variant: LeaderVariant.THIRD,
    avatar: thirdUser.avatar ?? '',
  }

  return (
    <div className={styles.container}>
      <div className={styles.leader}>
        <Link to={`/users/${firstUser.id}/profile`}>
          <LeaderCard {...firstLeader} />
        </Link>
      </div>

      <div className={styles.laggingers}>
        <Link to={`/users/${secondUser.id}/profile`}>
          <LeaderCard {...secondLeader} />
        </Link>

        <Link to={`/users/${thirdUser.id}/profile`}>
          <LeaderCard {...thirdLeader} />
        </Link>
      </div>
    </div>
  )
}
