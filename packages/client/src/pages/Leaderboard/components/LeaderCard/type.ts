export interface LeaderCardProps {
  name: string
  scores: number
  variant: LeaderVarian
}

export enum LeaderVarian {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
}
