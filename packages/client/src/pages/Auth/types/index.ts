export interface IAuthSignin {
  login: string
  password: string
}

export interface IAuthSignup extends IAuthSignin {
  first_name: string
  second_name: string
  email: string
  phone: string
}
