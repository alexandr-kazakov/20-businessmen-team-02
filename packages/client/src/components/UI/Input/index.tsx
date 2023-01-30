import React, { type InputHTMLAttributes, memo } from 'react'
import classnames from 'classnames'

import styles from './styles.module.scss'

type InputProps = {
  isValid?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = memo(({ isValid = true, ...inputProps }) => {
  const className = classnames(styles.input, {
    [`${inputProps.className}`]: inputProps.className,
    [styles.error]: !isValid,
  })

  return <input {...inputProps} className={className} />
})
