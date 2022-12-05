import React, { ButtonHTMLAttributes, memo, FC } from 'react'
import classnames from 'classnames'
import { ButtonStyles } from './types'
import styles from './styles.module.scss'

type OwnProps = {
  variant: ButtonStyles
} & ButtonHTMLAttributes<HTMLButtonElement>

type Props = OwnProps

const Button: FC<Props> = props => {
  const { variant, children, ...buttonProps } = props

  const className = classnames(styles.button, {
    [styles.button_primary]: variant === ButtonStyles.primary,
    [styles.button_secondary]: variant === ButtonStyles.secondary,
  })

  return (
    <button {...buttonProps} className={className}>
      {children}
    </button>
  )
}

export default memo(Button)
