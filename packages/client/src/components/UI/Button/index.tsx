import React, { type ButtonHTMLAttributes, memo } from 'react'
import classnames from 'classnames'

import styles from './styles.module.scss'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = memo(({ variant = 'primary', children, ...props }) => {
  const className = classnames(styles.button, {
    [styles.primary]: variant === 'primary',
    [styles.secondary]: variant === 'secondary',
  })

  return (
    <button {...props} className={className}>
      {children}
    </button>
  )
})
