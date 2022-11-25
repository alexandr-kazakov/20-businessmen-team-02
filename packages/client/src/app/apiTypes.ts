export enum StatusType {
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export interface AuthSigninType {
  login: string
  password: string
}
export interface AuthSignupType extends AuthSigninType {
  first_name: string
  second_name: string
  email: string
  phone: string
}
