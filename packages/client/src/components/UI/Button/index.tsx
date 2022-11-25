import React, { ButtonHTMLAttributes, memo } from 'react'
import styles from './styles.module.scss'

type OwnProps = {
  primary?: boolean
  secondary?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

type Props = OwnProps

const Button: React.FC<Props> = props => {
  const { primary, secondary, children, ...buttonProps } = props

  const className = [styles.button]

  if (buttonProps.className) {
    className.push(buttonProps.className)
  }

  if (primary) {
    className.push(styles.button_primary)
  }

  if (secondary) {
    className.push(styles.button_secondary)
  }

  return (
    <button {...buttonProps} className={className.join(' ')}>
      {children}
    </button>
  )
}

export default memo(Button)
