import React from 'react'
import { Link } from 'react-router-dom'
import { ErrorPageProps as ErrorPageProps } from '../types'
import styles from './styles.module.scss'

export const AbstractError: React.FC<ErrorPageProps> = (
  props: ErrorPageProps
) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>{props.code}</h1>

      <h2 className={styles.description}>{props.description}</h2>

      <p className={styles.message}>{props.message}</p>

      {props.showRedirect && (
        <Link className={styles.link} to="/">
          Back to home
        </Link>
      )}
    </div>
  )
}
