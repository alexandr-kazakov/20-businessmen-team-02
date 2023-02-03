import type { IUser } from '../Auth/types'

export const profileForm: IUser = {
  email: 'Почта',
  login: 'Логин',
  first_name: 'Имя',
  second_name: 'Фамилия',
  display_name: 'Псевдоним',
  phone: 'Телефон',
}

export const list = [
  {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    avatar: null,
    email: '',
    phone: '',
  },
]
