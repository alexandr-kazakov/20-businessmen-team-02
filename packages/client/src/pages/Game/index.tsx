import React, { useCallback, useState, useRef, useEffect, type DragEvent } from 'react'
import classnames from 'classnames'

import CanvasComponent from '../../components/Canvas'
import { Button } from '../../components/UI/Button'

import styles from './styles.module.scss'
import { useAppSelector } from '../../app/redux/hooks'
import { api } from '../../app/api'
import { TEAM_NAME, RATING_FIELD_NAME } from '../../domain/constants/leaderboard'

const LOCAL_STORAGE_LEVEL_LABEL = 'puzzleLevel'

const getEnding = (num: number) => {
  if (num === 0) return 'ов'
  if (num < 10 || Math.floor(num / 10) % 10 !== 1) {
    const mod = num % 10
    if (mod === 1) return 'о'
    if (mod > 1 && mod < 5) return 'а'
  }
  return 'ов'
}

const GamePage: React.FC = () => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const [initStart, setInitStart] = useState(0)
  const [scores, setScores] = useState(-1)
  const [level, setLevel] = useState(localStorage.getItem(LOCAL_STORAGE_LEVEL_LABEL) || '0')

  const header =
    scores < 0 ? null : scores === 0 ? 'У Вас 0 очков' : `Поздравляем у Вас ${scores} очк${getEnding(scores)}!`

  const clickStart = useCallback(() => {
    const musicEl = musicRef.current
    if (musicEl) {
      musicEl.loop = true
      musicEl.currentTime = 0
      musicEl.play()
    }
    setInitStart(performance.now())
  }, [])

  const clickPlayAgain = useCallback(() => {
    setInitStart(0)
    setScores(-1)
  }, [])

  const user = useAppSelector(state => state.auth.user)

  const setScoresAndPostUserScores = useCallback(
    (scores: number) => {
      if (scores >= 0 && musicRef.current) {
        musicRef.current.pause()
      }
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
    },
    [user]
  )

  const selectLevelHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setLevel(value)
    localStorage.setItem(LOCAL_STORAGE_LEVEL_LABEL, value)
  }

  const [dropZoneText, setDropZoneText] = useState('Вы можете перенести сюда файл с картинкой, которую будете собирать')
  const [src, setSrc] = useState('')

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDropZoneText('')
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const dt = event.dataTransfer
    const files = dt.files
    const count = files.length

    if (count) {
      const file = files[0]
      const { name, type } = file
      if (type.includes('image')) {
        const src0 = URL.createObjectURL(file)
        setDropZoneText(`${name}`)
        setSrc(src0)
      }
    }
  }

  const startBlock = (show: boolean) => {
    const className = classnames(styles.start, show ? styles.show : styles.hide)
    return (
      <div className={className}>
        <div className={styles.startHeader}>Для переключения в полноэкранный режим нажмите Ctrl-Q</div>
        <div
          id="dropZone"
          className={styles.dropZone}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          <div className={styles.dropZoneLabel}>{dropZoneText}</div>
        </div>
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
  }

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
        <CanvasComponent
          className={initStart ? styles.show : styles.hide}
          scores={scores}
          setScores={setScoresAndPostUserScores}
          level={level}
          initStart={initStart}
          src={src}
        />
        {startBlock(!initStart)}
      </div>
      {header && <h1 className={styles.congrat}>{header}</h1>}
      {header && playAgainButton}
      <audio controls src="/assets/music/music.mp3" ref={musicRef} className={styles.audio}></audio>
    </div>
  )
}

export default GamePage
