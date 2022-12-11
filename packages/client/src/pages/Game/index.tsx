import React, { useCallback, useState } from 'react'

import CanvasComponent from '@/components/Canvas'
import { Button } from '@/components/UI/Button'

import styles from './styles.module.scss'

const GamePage: React.FC = () => {
  const [initStart, setInitStart] = useState(0)
  const [scores, setScores] = useState(-1)
  const header = scores < 0 ? null : scores === 0 ? 'У Вас 0 очков' : `Поздравляем у Вас ${scores} очков!`

  const clickStart = useCallback(() => {
    setInitStart(Date.now())
  }, [])

  const clickPlayAgain = useCallback(() => {
    setInitStart(0)
    setScores(-1)
  }, [])

  const startButton = (
    <div className={styles.start}>
      <Button onClick={clickStart}>Старт</Button>
    </div>
  )

  const playAgainButton = (
    <div className={styles.restart}>
      <Button onClick={clickPlayAgain}>Играть ещё</Button>
    </div>
  )

  return (
    <>
      <div className={styles.container}>{initStart ? <CanvasComponent setScores={setScores} /> : startButton}</div>
      {header && <h1 className={styles.congrat}>{header}</h1>}
      {header && playAgainButton}
    </>
  )
}

export default GamePage
