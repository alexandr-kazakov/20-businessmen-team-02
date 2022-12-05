import { FC } from 'react'
import { Link } from 'react-router-dom'
import { RankCard } from './components/RankCard/RankCard'
import { Leaders } from './components/Leaders/Leaders'
import styles from './styles.module.scss'
import { User } from '../../domain/intefaceses/user'

// mock data
const users: User[] = [
  {
    alias: 'gora1',
    first_name: 'summer1',
    last_name: 'winter1',
    email: 'gora1@',
    avatar: null,
    scores: 32,
    id: 1,
    direction: 'acs',
  },
  {
    alias: 'gora8',
    first_name: 'summer8',
    last_name: 'winter8',
    email: 'gora8@',
    avatar: null,
    scores: 123,
    id: 12,
    direction: 'desc',
  },
  {
    alias: 'gora7',
    first_name: 'summer7',
    last_name: 'winter7',
    email: 'gora7@',
    avatar: null,
    scores: 323,
    id: 13,
    direction: 'acs',
  },
  {
    alias: 'gora5',
    first_name: 'summer5',
    last_name: 'winter5',
    email: 'gora5@',
    avatar: null,
    scores: 323,
    id: 14,
    direction: 'desc',
  },
  {
    alias: 'gora6',
    first_name: 'summer6',
    last_name: 'winter6',
    email: 'gora6@',
    avatar: null,
    scores: 423,
    id: 15,
    direction: 'desc',
  },
  {
    alias: 'gora4',
    first_name: 'summer4',
    last_name: 'winter4',
    email: 'gora4@',
    avatar: null,
    scores: 923,
    id: 16,
    direction: 'desc',
  },
  {
    alias: 'gora2',
    first_name: 'summer2',
    last_name: 'winter2',
    email: 'gora2@',
    avatar: null,
    scores: 1223,
    id: 17,
    direction: 'acs',
  },
  {
    alias: 'gora3',
    first_name: 'summer3',
    last_name: 'winter3',
    email: 'gora3@',
    avatar: null,
    scores: 1223,
    id: 18,
    direction: 'acs',
  },
]

export const Leaderboard: FC = () => {
  let leadersAllocationTemplate

  if (users?.length > 3) {
    leadersAllocationTemplate = (
      <>
        <Leaders users={users.slice(0, 3)} />

        <div className={styles.ranks}>
          {users.slice(3).map(user => (
            <Link to={`/users/${user.id}/profile`} key={user.id}>
              <RankCard {...user} />
            </Link>
          ))}
        </div>
      </>
    )
  } else {
    leadersAllocationTemplate = (
      <div className={styles.ranks}>
        {users.map(user => (
          <Link to={`/users/${user.id}/profile`} key={user.id}>
            <RankCard {...user} />
          </Link>
        ))}
      </div>
    )
  }

  return (
    <article className={styles.container}>
      <h1 className={styles.headline}>Leaderboard</h1>

      {leadersAllocationTemplate}
    </article>
  )
}
