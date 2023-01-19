import React, { type ButtonHTMLAttributes, memo } from 'react'
import classnames from 'classnames'

import styles from './styles.module.scss'

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

type ButtonProps = {
  variant?: ButtonVariant
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = memo(({ variant = ButtonVariant.PRIMARY, children, ...props }) => {
  const className = classnames(styles.button, {
    [styles.primary]: variant === ButtonVariant.PRIMARY,
    [styles.secondary]: variant === ButtonVariant.SECONDARY,
  })

  return (
    <button {...props} className={classnames(className, props.className)}>
      {children}
    </button>
  )
})
