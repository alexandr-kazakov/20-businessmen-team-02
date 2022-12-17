import React, { FC } from 'react'
import styles from './styles.module.scss'

const MainPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Игра - Пазл</h1>
      <p className={styles.description}>Соберите картинку из частей</p>
      <p className={styles.description}>Чем быстрее соберёте, тем больше очков получите</p>
      <p className={styles.description}>Станьте чемпионом и возглавьте список лидеров!</p>
    </div>
  )
}

export default MainPage
