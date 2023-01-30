import React, { useCallback, useState, useRef, useEffect } from 'react'

import CanvasComponent from '@/components/Canvas'
import { Button } from '@/components/UI/Button'

import styles from './styles.module.scss'
import { useAppSelector } from '@/app/redux/hooks'
import { api } from '@/app/api'
import { RATING_FIELD_NAME, TEAM_NAME } from '@/domain/constants/leaderboard'

const LOCAL_STORAGE_LEVEL_LABEL = 'puzzleLevel'

const GamePage: React.FC = () => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [initStart, setInitStart] = useState(0)
  const [scores, setScores] = useState(-1)
  const [level, setLevel] = useState(localStorage.getItem(LOCAL_STORAGE_LEVEL_LABEL) || '0')

  const header = scores < 0 ? null : scores === 0 ? 'У Вас 0 очков' : `Поздравляем у Вас ${scores} очков!`

  const clickStart = useCallback(() => {
    setInitStart(Date.now())
  }, [])

  const clickPlayAgain = useCallback(() => {
    setInitStart(0)
    setScores(-1)
  }, [])

  const user = useAppSelector(state => state.auth.user)

  const setScoresAndPostUserScores = (scores: number) => {
    setScores(scores)

    if (user && scores > 0) {
      const { id, avatar, display_name } = user
      const payload = {
        data: { id, avatar, display_name, scores },
        ratingFieldName: RATING_FIELD_NAME,
        teamName: TEAM_NAME,
      }

      api.post('/leaderboard', payload)
    }
  }

  const selectLevelHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setLevel(value)
    localStorage.setItem(LOCAL_STORAGE_LEVEL_LABEL, value)
  }

  const startBlock = (
    <div className={styles.start}>
      <div className={styles.startHeader}>Для переключения в полноэкранный режим нажмите Ctrl-Q</div>
      <label htmlFor="level" className={styles.selectLabel}>
        Выберите уровень:
      </label>
      <select id="level" className={styles.select} onChange={selectLevelHandle} value={level}>
        <option value="0">Новичок</option>
        <option value="1">Продвинутый</option>
        <option value="2">Эксперт</option>
      </select>
      <Button onClick={clickStart}>Старт</Button>
    </div>
  )

  const playAgainButton = (
    <div className={styles.restart}>
      <Button onClick={clickPlayAgain}>Играть ещё</Button>
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

  const toggleFullScreen = useCallback((element: HTMLDivElement) => {
    if (isFullScreen()) {
      exitFullScreen()
    } else {
      requestFullscreen(element)
    }
  }, [])

  const handlerKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === 'KeyQ') {
        if (elementRef.current) {
          toggleFullScreen(elementRef.current)
        }
      }
    },
    [toggleFullScreen]
  )

  useEffect(() => {
    document.addEventListener('keydown', handlerKeyDown)

    return () => {
      document.removeEventListener('keydown', handlerKeyDown)
    }
  }, [handlerKeyDown])

  return (
    <div className={styles.game} ref={elementRef}>
      <div className={styles.container}>
        {initStart ? <CanvasComponent setScores={setScoresAndPostUserScores} level={level} /> : startBlock}
      </div>
      {header && <h1 className={styles.congrat}>{header}</h1>}
      {header && playAgainButton}
    </div>
  )
}

export default GamePage
