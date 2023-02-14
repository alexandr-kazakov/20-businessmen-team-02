import type { User } from 'domain/intefaceses/user'

export type UsersRate = UserRate[]

export type UserRate = Pick<User, 'id' | 'avatar' | 'display_name'> & Rate

export interface Rate {
  scores: number
  direction: 'desc' | 'acs'
}
