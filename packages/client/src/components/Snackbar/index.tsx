import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks'
import { hideSnackBar } from './redux/snackbarSlice'

import styles from './styles.module.scss'

export const Snackbar: React.FC = () => {
  const { message, isShow } = useAppSelector(state => state.snack)
  const dispatch = useAppDispatch()
  let timer: ReturnType<typeof setTimeout> | undefined

  const handleTimeout = () => {
    timer = setTimeout(() => {
      dispatch(hideSnackBar())
    }, 3000)
  }

  const handleClose = () => {
    dispatch(hideSnackBar())
  }

  useEffect(() => {
    if (isShow) {
      handleTimeout()
    }
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow, timer])

  return isShow ? (
    <div className={styles.container}>
      <div className={styles.label}>{message}</div>
      <div className={styles.close} onClick={handleClose}>
        &times;
      </div>
    </div>
  ) : null
}
