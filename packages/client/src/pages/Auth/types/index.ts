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
