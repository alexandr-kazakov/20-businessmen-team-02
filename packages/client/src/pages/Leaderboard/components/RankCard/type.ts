import { User } from '../../type'

export type RankCardProps = Omit<User, 'email' | 'last_name'>
