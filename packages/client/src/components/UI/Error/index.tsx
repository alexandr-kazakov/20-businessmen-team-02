import React from 'react'

import styles from './styles.module.scss'

interface ErrorBoundaryProps {
  children?: React.ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state

    if (error) {
      return (
        <div className={styles.container}>
          <div className={styles.title}>Что то пошло не так... ( ˘︹˘ )</div>

          {error.message && (
            <div className={styles.error}>Текст ошибки: {error.message}</div>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
