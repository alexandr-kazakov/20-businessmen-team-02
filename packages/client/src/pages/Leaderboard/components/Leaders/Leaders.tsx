import { FC } from 'react'
import styles from './styles.module.scss'
import { LeaderCard } from '../LeaderCard/LeaderCard'
import { LeadersProps } from './type'
import { LeaderVarian } from '../LeaderCard/type'
import { LeaderCardProps } from '../LeaderCard/type'
import { WithRedirectTo } from '../../../../decorators/WithRedirectTo'

export const Leaders: FC<LeadersProps> = ({ users: [firstUser, secondUser, thirdUser] }: LeadersProps) => {
  const firstLeader: LeaderCardProps = {
    name: firstUser.alias || firstUser.first_name,
    scores: firstUser.scores,
    variant: LeaderVarian.FIRST,
  }

  const secondLeader: LeaderCardProps = {
    name: secondUser.alias || secondUser.first_name,
    scores: secondUser.scores,
    variant: LeaderVarian.SECOND,
  }

  const thirdLeader: LeaderCardProps = {
    name: thirdUser.alias || thirdUser.first_name,
    scores: thirdUser.scores,
    variant: LeaderVarian.THIRD,
  }

  return (
    <div className={styles.container}>
      <div className={styles.leader}>
        <WithRedirectTo url={`/users/${firstUser.id}/profile`}>
          <LeaderCard {...firstLeader} />
        </WithRedirectTo>
      </div>

      <div className={styles.laggingers}>
        <WithRedirectTo url={`/users/${secondUser.id}/profile`}>
          <LeaderCard {...secondLeader} />
        </WithRedirectTo>

        <WithRedirectTo url={`/users/${thirdUser.id}/profile`}>
          <LeaderCard {...thirdLeader} />
        </WithRedirectTo>
      </div>
    </div>
  )
}
