import React, { FC, useState } from 'react'
import CanvasComponent from '../../components/Canvas'
import Button from '../../components/UI/Button'
import { ButtonStyles } from '../../components/UI/Button/types'
import styles from './styles.module.scss'

const GamePage: FC = () => {
  const [initStart, setInitStart] = useState(0)
  const [scores, setScores] = useState(-1)
  const header = scores < 0 ? null : scores === 0 ? 'У Вас 0 очков' : `Поздравляем у Вас ${scores} очков!`

  return (
    <>
      <div className={styles.container}>
        {initStart ? (
          <CanvasComponent setScores={setScores} initStart={initStart} />
        ) : (
          <div className={styles.start}>
            <Button
              variant={ButtonStyles.primary}
              onClick={() => {
                setInitStart(Date.now())
              }}>
              Старт
            </Button>
          </div>
        )}
      </div>
      {header && <h1 className={styles.congrat}>{header}</h1>}
      {header && (
        <div className={styles.restart}>
          <Button
            variant={ButtonStyles.primary}
            onClick={() => {
              setInitStart(0)
              setScores(-1)
            }}>
            Играть ещё
          </Button>
        </div>
      )}
    </>
  )
}

export default GamePage
