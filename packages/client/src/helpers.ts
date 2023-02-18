import DOMPurify from 'dompurify'
import type { IObjectKeys } from './domain/intefaceses/user'

export const purify = (value: any) => DOMPurify.sanitize(value)

export const purifyValues = (values: IObjectKeys) => {
  for (const key in values) {
    values[key] = purify(values[key])
  }

  return values
}
