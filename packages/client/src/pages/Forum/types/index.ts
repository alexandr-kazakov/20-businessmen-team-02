export interface IComment {
  Reactions: IReaction[]
  createdAt: string
  id: string
  id_author: string
  id_parent: string | null
  id_topic: string
  login_author: string
  text: string
  updatedAt: string
}

export interface INewComment {
  id_topic: string
  id_author: string
  login_author: string
  text: string
}

export interface IReaction {
  createdAt: string
  id: string
  id_author: string
  id_comment: string
  updatedAt: string
  value: string
}

export interface INewReaction {
  id_comment: string
  id_author: string
  value: string
}

export interface ITopic {
  createdAt: string
  description: string
  id: string
  id_author: string
  title: string
  updatedAt: string
}

export interface INewTopic {
  id_author: string
  title: string
  description: string
}
