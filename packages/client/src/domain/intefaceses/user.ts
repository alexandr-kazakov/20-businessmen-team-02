export interface IObjectKeys {
  [key: string]: any
}

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string | null
  email: string
  phone: string
}
