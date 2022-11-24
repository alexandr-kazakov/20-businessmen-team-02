import React, { ButtonHTMLAttributes, memo } from 'react'

type OwnProps = {
  customProp?: any
} & ButtonHTMLAttributes<HTMLButtonElement>

type Props = OwnProps

const Button: React.FC<Props> = props => {
  const { customProp, children, ...buttonProps } = props

  return <button {...buttonProps}>{children}</button>
}

export default memo(Button)
