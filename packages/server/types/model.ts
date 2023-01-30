export interface IComment {
  id: string
  id_topic: string
  id_author: string
  text: string
}

export interface IReaction {
  id: string
  id_comment: string
  id_author: string
  value: string
}

export interface ITopic {
  id: string
  id_author: string
  title: string
  description: string
}

export interface IUser {
  id: number
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string | null
  avatar: string | null
  phone: string
  theme: string
}
