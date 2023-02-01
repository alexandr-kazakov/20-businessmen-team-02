import React from 'react'
import { Link } from 'react-router-dom'
import type { UsersRate } from '../../types/user-rates'
import { LeaderCard, LeaderVariant } from '../LeaderCard'

import styles from './styles.module.scss'

interface LeadersProps {
  usersRate: UsersRate
}

export const Leaders: React.FC<LeadersProps> = ({ usersRate }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leader}>
        <Link to={`/users/${usersRate[0].id}/profile`}>
          <LeaderCard {...{ ...usersRate[0], variant: LeaderVariant.FIRST }} />
        </Link>
      </div>

      <div className={styles.laggingers}>
        <Link to={`/users/${usersRate[1].id}/profile`}>
          <LeaderCard {...{ ...usersRate[1], variant: LeaderVariant.SECOND }} />
        </Link>

        <Link to={`/users/${usersRate[2].id}/profile`}>
          <LeaderCard {...{ ...usersRate[2], variant: LeaderVariant.THIRD }} />
        </Link>
      </div>
    </div>
  )
}
