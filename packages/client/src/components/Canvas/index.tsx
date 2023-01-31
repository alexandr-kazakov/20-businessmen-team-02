import React, { useRef, useEffect, useState, useCallback } from 'react'
import { getRandomInt } from './helper'
import type { Position, ImageObj, Props, AmountPartByLevel } from './types'

const TIMEBAR_HIGHT = 40,
  IMG_BORDER = 20,
  IMG_DIVIDER = 2,
  CANVAS_COLOR = 'gray',
  DELAY = 200,
  LEFT_MENU_WIDTH = 40,
  CHEBURASHKA = 600,
  AMOUNT_PART_BY_LEVEL: AmountPartByLevel = {
    '0': 3,
    '1': 4,
    '2': 5,
  },
  TIME_LIMIT = 20000

const CanvasComponent: React.FC<Props> = ({ className, setScores, level, initStart, src }) => {
  const ref = useRef(null)

  const [sourceSizes, setSourceSizes] = useState({ sourceFullWidth: CHEBURASHKA, sourceFullHeight: CHEBURASHKA })

  const imgAmountX = AMOUNT_PART_BY_LEVEL[level],
    imgAmountY = AMOUNT_PART_BY_LEVEL[level],
    levelNum = Number(level),
    timeLimit = TIME_LIMIT * (1 + levelNum * levelNum)

  const resize = useCallback(
    (sourceSizes: { sourceFullWidth: number; sourceFullHeight: number }) => {
      const { sourceFullWidth, sourceFullHeight } = sourceSizes
      const winWidth = window.innerWidth - LEFT_MENU_WIDTH,
        winHeight = window.innerHeight - TIMEBAR_HIGHT

      const k = Math.min(winWidth / sourceFullWidth, winHeight / sourceFullHeight),
        maxWidth = sourceFullWidth * k,
        maxHeight = sourceFullHeight * k

      const imgPartWidth = Math.floor((maxWidth - 2 * IMG_BORDER - (imgAmountX - 1) * IMG_DIVIDER) / imgAmountX),
        imgPartHeight = Math.floor((maxHeight - 2 * IMG_BORDER - (imgAmountY - 1) * IMG_DIVIDER) / imgAmountY),
        canvasWidth = imgPartWidth * imgAmountX + 2 * IMG_BORDER + (imgAmountX - 1) * IMG_DIVIDER,
        canvasHeight = TIMEBAR_HIGHT + imgPartHeight * imgAmountY + 2 * IMG_BORDER + (imgAmountY - 1) * IMG_DIVIDER,
        sourceWidth = Math.floor(sourceFullWidth / imgAmountX),
        sourceHeight = Math.floor(sourceFullHeight / imgAmountY)

      return { imgPartWidth, imgPartHeight, canvasWidth, canvasHeight, sourceWidth, sourceHeight }
    },
    [imgAmountX, imgAmountY]
  )

  const [sizes, setSizes] = useState(resize(sourceSizes))
  const { imgPartWidth, imgPartHeight, canvasWidth, canvasHeight } = sizes

  useEffect(() => {
    setSizes(resize(sourceSizes))
  }, [resize, sourceSizes])

  const getCoordX = (x: number, size: number) => x * (size + IMG_DIVIDER) + IMG_BORDER
  const getCoordY = (x: number, size: number) => x * (size + IMG_DIVIDER) + IMG_BORDER + TIMEBAR_HIGHT

  const [imageArray, setImageArray] = useState<ImageObj[]>([])
  const [finishedPlay, setFinished] = useState(false)
  const [start, setStart] = useState(-1)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const handleResize = () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        setSizes(resize(sourceSizes))
      }, 500)
    }

    window.addEventListener('resize', handleResize)

    if (ref.current) {
      const canvas: HTMLCanvasElement = ref.current
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.fillStyle = CANVAS_COLOR
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const drawTimebar = () => {
          const color = 'green',
            rate = (initStart + timeLimit - performance.now()) / timeLimit

          if (rate > 0) {
            const width = Math.round(rate * (canvasWidth - IMG_BORDER * 2))
            ctx.strokeStyle = color
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.roundRect(IMG_BORDER, IMG_BORDER, width, IMG_BORDER, IMG_BORDER / 2)
            ctx.stroke()
            ctx.fill()
            ctx.strokeStyle = CANVAS_COLOR
            ctx.fillStyle = CANVAS_COLOR
          }
        }

        drawTimebar()

        let finished = finishedPlay
        const startPos: Position[] = []
        let draggable: ImageObj | null = null,
          first: ImageObj | null = null,
          second: ImageObj | null = null
        let startAnimate = 0

        for (let x = 0; x < imgAmountX; x++) {
          for (let y = 0; y < imgAmountY; y++) {
            startPos.push({
              posX: x,
              posY: y,
            })
          }
        }

        let imgArr: ImageObj[] = []
        const imageElement = new Image()
        imageElement.onload = function () {
          const { width, height } = this as HTMLImageElement
          const { sourceFullWidth, sourceFullHeight } = sourceSizes

          if (start !== initStart || sourceFullWidth !== width || sourceFullHeight !== height) {
            const { imgPartWidth, imgPartHeight, sourceWidth, sourceHeight } = resize({
              sourceFullWidth: width,
              sourceFullHeight: height,
            })
            for (let x = 0; x < imgAmountX; x++) {
              for (let y = 0; y < imgAmountY; y++) {
                const sourceX = x * sourceWidth
                const sourceY = y * sourceHeight
                const origX = x
                const origY = y
                let pos: Position
                if (startPos.length === 1) {
                  pos = startPos[0]
                } else {
                  const rnd = getRandomInt(startPos.length)
                  pos = startPos[rnd]
                  startPos.splice(rnd, 1)
                }
                const { posX, posY } = pos
                imgArr.push({
                  sourceX,
                  sourceY,
                  sourceWidth,
                  sourceHeight,
                  posX,
                  posY,
                  origX,
                  origY,
                })
                ctx.drawImage(
                  imageElement,
                  sourceX,
                  sourceY,
                  sourceWidth,
                  sourceHeight,
                  getCoordX(posX, imgPartWidth),
                  getCoordY(posY, imgPartHeight),
                  imgPartWidth,
                  imgPartHeight
                )
              }
            }
            if (sourceFullWidth !== width || sourceFullHeight !== height) {
              setSourceSizes({ sourceFullWidth: width, sourceFullHeight: height })
            }
            setStart(initStart)
            setImageArray([...imgArr])
            finished = false
            setFinished(false)
          } else {
            imgArr = [...imageArray]
            refreshCanvas()
          }
        }
        imageElement.src = src || '/assets/images/cheburashka.png'

        canvas.onmousedown = e => {
          if (!finished) {
            for (const imgObj of imgArr) {
              const posX = getCoordX(imgObj.posX, imgPartWidth),
                posY = getCoordY(imgObj.posY, imgPartHeight)
              if (
                e.offsetX > posX &&
                e.offsetX < posX + imgPartWidth &&
                e.offsetY > posY &&
                e.offsetY < posY + imgPartHeight
              ) {
                draggable = imgObj
                draggable.currX = e.offsetX - imgPartWidth / 2
                draggable.currY = e.offsetY - imgPartHeight / 2
                break
              }
            }
          }
        }

        canvas.onmousemove = e => {
          if (draggable) {
            draggable.currX = e.offsetX - imgPartWidth / 2
            draggable.currY = e.offsetY - imgPartHeight / 2
            requestAnimationFrame(refreshCanvas)
          }
        }

        canvas.onmouseup = e => {
          if (draggable) {
            startAnimate = performance.now()
            for (const imgObj of imgArr) {
              const posX = getCoordX(imgObj.posX, imgPartWidth),
                posY = getCoordY(imgObj.posY, imgPartHeight)
              if (
                e.offsetX > posX &&
                e.offsetX < posX + imgPartWidth &&
                e.offsetY > posY &&
                e.offsetY < posY + imgPartHeight
              ) {
                second = imgObj
                break
              }
            }
            first = draggable
            first.fromX = first.currX
            first.fromY = first.currY

            if (second) {
              const { posX, posY } = second
              second.fromX = posX
              second.fromY = posY

              second.posX = draggable.posX
              second.posY = draggable.posY

              first.posX = posX
              first.posY = posY
            }

            draggable = null
            animate()
          }
        }
        canvas.onmouseout = () => {
          if (draggable) {
            startAnimate = performance.now()
            first = draggable
            first.fromX = first.currX
            first.fromY = first.currY
            draggable = null
            animate()
          }
        }

        const refreshCanvas = () => {
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          let result = true

          drawTimebar()

          for (const imgObj of imgArr) {
            if (imgObj === draggable || imgObj === first || imgObj === second) {
              continue
            }
            const { posX, posY, origX, origY, sourceX, sourceY, sourceWidth, sourceHeight } = imgObj
            const x = getCoordX(posX, imgPartWidth),
              y = getCoordY(posY, imgPartHeight)
            ctx.drawImage(imageElement, sourceX, sourceY, sourceWidth, sourceHeight, x, y, imgPartWidth, imgPartHeight)
            if (result && (posX !== origX || posY !== origY)) {
              result = false
            }
          }
          ;[second, first, draggable].map(moved => {
            if (moved) {
              const { currX = 0, currY = 0, sourceX, sourceY, sourceWidth, sourceHeight } = moved
              ctx.drawImage(
                imageElement,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                currX,
                currY,
                imgPartWidth,
                imgPartHeight
              )
            }
          })
          if (result && !finished) {
            let scores = Math.round((initStart + timeLimit - performance.now()) / 100)
            scores < 0 && (scores = 0)
            finished = true
            setFinished(true)
            timer = setTimeout(() => {
              // окончание игры
              setScores(scores)
            }, DELAY)
          }
        }

        const calculateCoord = (from: number, to: number, t: number) => {
          return Math.round(from + (2 * (to - from) * t) / DELAY - ((to - from) * t * t) / (DELAY * DELAY))
        }

        const animate = () => {
          const now = performance.now()

          if (now >= startAnimate + DELAY) {
            first = null
            second = null
          } else {
            const t = now - startAnimate
            if (first && first.fromX && first.fromY) {
              first.currX = calculateCoord(first.fromX, getCoordX(first.posX, imgPartWidth), t)
              first.currY = calculateCoord(first.fromY, getCoordY(first.posY, imgPartHeight), t)
            }
            if (second && typeof second.fromX === 'number' && typeof second.fromY === 'number') {
              second.currX = calculateCoord(
                getCoordX(second.fromX, imgPartWidth),
                getCoordX(second.posX, imgPartWidth),
                t
              )
              second.currY = calculateCoord(
                getCoordY(second.fromY, imgPartHeight),
                getCoordY(second.posY, imgPartHeight),
                t
              )
            }
          }
          refreshCanvas()
          if (first) {
            requestAnimationFrame(animate)
          }
        }

        const animateTimeBar = () => {
          ctx.beginPath()
          ctx.roundRect(IMG_BORDER, IMG_BORDER, canvasWidth - IMG_BORDER * 2, IMG_BORDER, IMG_BORDER / 2)
          ctx.stroke()
          ctx.fill()
          drawTimebar()
          if (!finished && initStart + timeLimit - performance.now() > 0) {
            requestAnimationFrame(animateTimeBar)
          }
        }
        animateTimeBar()
      }
    }

    return () => {
      timer && clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initStart, sizes, sourceSizes])

  return <canvas ref={ref} width={canvasWidth} height={canvasHeight} className={className} />
}

export default CanvasComponent
