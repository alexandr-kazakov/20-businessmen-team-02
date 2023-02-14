export interface IAuthSignIn {
  login: string
  password: string
}

export interface IAuthSignup extends IAuthSignIn {
  first_name: string
  second_name: string
  email: string
  phone: string
}

export interface OauthYandexId {
  code: string
  redirect_uri: string
}

export type IUser = {
  avatar?: string | null
  display_name: string | null
  email: string
  first_name: string
  id?: number
  login: string
  phone: string
  second_name: string
}

export type IUserKey = keyof IUser
