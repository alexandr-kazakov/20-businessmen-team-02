import React, { useEffect } from 'react'
import classnames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../app/redux/hooks'
import { setTheme } from './themeSlice'

import styles from './styles.module.scss'

interface ThemeProps {
  className?: string
}

export const Theme: React.FC<ThemeProps> = ({ className }) => {
  const theme = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleChange = () => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))

  return (
    <div className={styles.root}>
      <div
        className={classnames(className, styles.theme, theme === 'dark' ? styles.dark : styles.light)}
        onClick={handleChange}
      />
    </div>
  )
}
