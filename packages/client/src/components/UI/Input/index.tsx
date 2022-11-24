import React, { InputHTMLAttributes, memo } from 'react'

type OwnProps = {
  customProp?: any
} & InputHTMLAttributes<HTMLInputElement>

type Props = OwnProps

const Input: React.FC<Props> = props => {
  const { customProp, ...inputProps } = props

  return <input {...inputProps} />
}

export default memo(Input)
