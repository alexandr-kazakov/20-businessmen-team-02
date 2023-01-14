import React, { useRef, useEffect, useState, useCallback } from 'react'
import { getRandomInt } from './helper'
import type { Position, ImageObj, Props, AmountPartByLevel } from './types'

const IMG_BORDER = 20,
  IMG_DIVIDER = 2,
  CANVAS_COLOR = 'gray',
  DELAY = 200,
  LEFT_MENU_WIDTH = 40,
  CHEBURASHKA = 600,
  AMOUNT_PART_BY_LEVEL: AmountPartByLevel = {
    '0': 3,
    '1': 4,
    '2': 5,
  }

const CanvasComponent: React.FC<Props> = ({ className, setScores, level, initStart, src }) => {
  const ref = useRef(null)

  const [sourceSizes, setSourceSizes] = useState({ sourceFullWidth: CHEBURASHKA, sourceFullHeight: CHEBURASHKA })

  const imgAmountX = AMOUNT_PART_BY_LEVEL[level],
    imgAmountY = AMOUNT_PART_BY_LEVEL[level]

  const resize = useCallback(
    (sourceSizes: { sourceFullWidth: number; sourceFullHeight: number }) => {
      const { sourceFullWidth, sourceFullHeight } = sourceSizes
      const winWidth = window.innerWidth - LEFT_MENU_WIDTH,
        winHeight = window.innerHeight

      const k = Math.min(winWidth / sourceFullWidth, winHeight / sourceFullHeight),
        maxWidth = sourceFullWidth * k,
        maxHeight = sourceFullHeight * k

      const imgPartWidth = Math.floor((maxWidth - 2 * IMG_BORDER - (imgAmountX - 1) * IMG_DIVIDER) / imgAmountX),
        imgPartHeight = Math.floor((maxHeight - 2 * IMG_BORDER - (imgAmountY - 1) * IMG_DIVIDER) / imgAmountY),
        canvasWidth = imgPartWidth * imgAmountX + 2 * IMG_BORDER + (imgAmountX - 1) * IMG_DIVIDER,
        canvasHeight = imgPartHeight * imgAmountY + 2 * IMG_BORDER + (imgAmountY - 1) * IMG_DIVIDER,
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

  const getCoord = (x: number, size: number) => x * (size + IMG_DIVIDER) + IMG_BORDER

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
                  getCoord(posX, imgPartWidth),
                  getCoord(posY, imgPartHeight),
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
              const posX = getCoord(imgObj.posX, imgPartWidth),
                posY = getCoord(imgObj.posY, imgPartHeight)
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
              const posX = getCoord(imgObj.posX, imgPartWidth),
                posY = getCoord(imgObj.posY, imgPartHeight)
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
          for (const imgObj of imgArr) {
            if (imgObj === draggable || imgObj === first || imgObj === second) {
              continue
            }
            const { posX, posY, origX, origY, sourceX, sourceY, sourceWidth, sourceHeight } = imgObj
            const x = getCoord(posX, imgPartWidth),
              y = getCoord(posY, imgPartHeight)
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
            const levelNum = Number(level)
            let scores = Math.round((20000 * (1 + levelNum * levelNum) - (Date.now() - initStart)) / 100)
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
              first.currX = calculateCoord(first.fromX, getCoord(first.posX, imgPartWidth), t)
              first.currY = calculateCoord(first.fromY, getCoord(first.posY, imgPartHeight), t)
            }
            if (second && typeof second.fromX === 'number' && typeof second.fromY === 'number') {
              second.currX = calculateCoord(
                getCoord(second.fromX, imgPartWidth),
                getCoord(second.posX, imgPartWidth),
                t
              )
              second.currY = calculateCoord(
                getCoord(second.fromY, imgPartHeight),
                getCoord(second.posY, imgPartHeight),
                t
              )
            }
          }
          refreshCanvas()
          if (first) {
            requestAnimationFrame(animate)
          }
        }
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
