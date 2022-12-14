import React from 'react'
import styles from './style.module.scss'

interface IClickOutside {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}

export const ClickOutside: React.FC<IClickOutside> = ({ isActive, onClick, children }) => {
  return (
    <>
      {isActive && <div className={styles.clickOutside} onClick={onClick} />}
      {children}
    </>
  )
}
