import { HTMLInputElement } from 'react'
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLInputElement<T> {
    orient?: string
  }
}
