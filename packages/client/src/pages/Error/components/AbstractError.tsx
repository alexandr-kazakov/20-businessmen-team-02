import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles.module.scss'

export interface ErrorPageProps {
  code: string
  description: string
  message: string
  showRedirect: boolean
}

export const AbstractError: React.FC<ErrorPageProps> = ({ code, description, message, showRedirect }) => (
  <div className={styles.container}>
    <h1 className={styles.code}>{code}</h1>
    <h2 className={styles.description}>{description}</h2>
    <p className={styles.message}>{message}</p>

    {showRedirect && (
      <Link className={styles.link} to="/">
        Back to home
      </Link>
    )}
  </div>
)
