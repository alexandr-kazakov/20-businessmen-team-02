import React, { InputHTMLAttributes, memo, FC } from 'react'
import classnames from 'classnames'
import styles from './styles.module.scss'

type OwnProps = {
  isValid?: boolean
} & InputHTMLAttributes<HTMLInputElement>

type Props = OwnProps

const Input: FC<Props> = props => {
  const { isValid = true, ...inputProps } = props

  const className = classnames(styles.input, {
    [styles.input_error]: !isValid,
  })

  return <input {...inputProps} className={className} />
}

export default memo(Input)
