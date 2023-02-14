import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { RankCard } from './components/RankCard'
import { Leaders } from './components/Leaders'
import { getUsersRateThunk } from './redux/leaderboardSlice'
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks'
import type { UsersRate } from './types/user-rates'

import styles from './styles.module.scss'

const Leaderboard: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsersRateThunk())
  }, [dispatch])

  const usersRate: UsersRate = useAppSelector(state => state.leaderboard.usersRate)

  const getRankCardTemplate = (usersRate: UsersRate) => (
    <div className={styles.ranks}>
      {usersRate.map(userRate => (
        <Link to={`/users/${userRate.id}/profile`} key={userRate.id}>
          <RankCard {...userRate} />
        </Link>
      ))}
    </div>
  )

  const shouldLeadersBeShown: boolean = usersRate.length > 3

  return (
    <article className={styles.container}>
      <h1 className={styles.headline}>Рейтинг игроков</h1>

      {!usersRate.length && <h2>Нет игроков</h2>}

      {shouldLeadersBeShown && <Leaders usersRate={usersRate.slice(0, 3)} />}

      {getRankCardTemplate(shouldLeadersBeShown ? usersRate.slice(3) : usersRate)}
    </article>
  )
}

export default Leaderboard
