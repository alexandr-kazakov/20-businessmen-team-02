import React, { InputHTMLAttributes, memo } from 'react'
import styles from './styles.module.scss'

type OwnProps = {
  isValid?: boolean
} & InputHTMLAttributes<HTMLInputElement>

type Props = OwnProps

const Input: React.FC<Props> = props => {
  const { isValid = true, ...inputProps } = props

  const className = [styles.input]

  if (inputProps.className) {
    className.push(inputProps.className)
  }

  if (!isValid) {
    className.push(styles.input_error)
  }

  return <input {...inputProps} className={className.join(' ')} />
}

export default memo(Input)
