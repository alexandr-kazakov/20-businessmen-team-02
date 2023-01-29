export interface IUser {
  theme: string
  avatar: string | null
  display_name: string | null
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
}

export interface IComment {
  id?: string
  id_topic: string
  id_author: string
  text: string
  date: string
  likes: number
}

export interface ITopic {
  id?: string
  title: string
  description: string
  id_author: string
  date: string
  views: number
}
