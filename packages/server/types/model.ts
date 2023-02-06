export interface IComment {
  id: string
  id_topic: string
  id_parent?: string | null
  id_author: string
  login_author: string
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
