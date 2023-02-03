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

export type IUserKey = 'id' | 'first_name' | 'second_name' | 'display_name' | 'login' | 'avatar' | 'email' | 'phone'

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
