import React, { type InputHTMLAttributes, memo } from 'react'
import classnames from 'classnames'

import styles from './styles.module.scss'

type InputProps = {
  isValid?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = memo(({ isValid = true, ...props }) => {
  const className = classnames(styles.input, props.className, {
    [styles.error]: !isValid,
  })

  return <input {...props} className={className} />
})
