export interface User {
  id: number
  alias: string
  first_name: string
  last_name: string
  email: string
  avatar: string | null
  scores: number
  direction: 'desc' | 'acs'
}
