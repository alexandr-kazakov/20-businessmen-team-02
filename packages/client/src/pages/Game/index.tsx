import React, { FC, useState } from 'react'
import CanvasComponent from '../../components/Canvas'
import styles from './styles.module.scss'

const GamePage: FC = () => {
  const [scores, setScores] = useState(-1)
  const header = scores < 0 ? null : scores === 0 ? 'У Вас 0 очков' : `Поздравляем у Вас ${scores} очков!`

  return (
    <>
      <div className={styles.container}>
        <CanvasComponent setScores={setScores} />
      </div>
      {header && <h1 className={styles.congrat}>{header}</h1>}
    </>
  )
}

export default GamePage
