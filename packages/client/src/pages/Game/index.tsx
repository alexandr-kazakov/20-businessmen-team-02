import React, { FC, useEffect, useRef, useState } from 'react'
import CanvasComponent from '@/components/Canvas'
import Button from '@/components/UI/Button'
import { ButtonStyles } from '@/components/UI/Button/types'
import styles from './styles.module.scss'

const GamePage: FC = () => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [initStart, setInitStart] = useState<number>(0)
  const [scores, setScores] = useState<number>(-1)
  const header = scores < 0 ? null : scores === 0 ? 'У Вас 0 очков' : `Поздравляем у Вас ${scores} очков!`

  const clickStart = () => {
    setInitStart(Date.now())
  }

  const clickPlayAgain = () => {
    setInitStart(0)
    setScores(-1)
  }

  const startButton = (
    <div className={styles.start}>
      <Button variant={ButtonStyles.primary} onClick={clickStart}>
        Старт
      </Button>
    </div>
  )

  const playAgainButton = (
    <div className={styles.restart}>
      <Button variant={ButtonStyles.primary} onClick={clickPlayAgain}>
        Играть ещё
      </Button>
    </div>
  )

  const requestFullscreen = (element: HTMLDivElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    }
  }

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  const isFullScreen = () => {
    return document.fullscreenElement
  }

  const toggleFullScreen = (element: HTMLDivElement) => {
    if (isFullScreen()) {
      exitFullScreen()
    } else {
      requestFullscreen(element)
    }
  }

  const handlerKeyDown = (event: any) => {
    if (event.ctrlKey && event.code === 'KeyQ') {
      if (elementRef.current) {
        toggleFullScreen(elementRef.current)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', event => handlerKeyDown(event))

    return () => {
      document.removeEventListener('keydown', event => handlerKeyDown(event))
    }
  }, [])

  return (
    <div className={styles.game} ref={elementRef}>
      <div className={styles.container}>{initStart ? <CanvasComponent setScores={setScores} /> : startButton}</div>
      {header && <h1 className={styles.congrat}>{header}</h1>}
      {header && playAgainButton}
    </div>
  )
}

export default GamePage
