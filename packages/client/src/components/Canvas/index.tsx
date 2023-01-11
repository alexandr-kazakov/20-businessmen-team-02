import React, { useRef, useEffect } from 'react'
import { getRandomInt } from './helper'
import type { Position, ImageObj, Props, AmountPartByLevel } from './types'

const IMG_BORDER = 20,
  IMG_DIVIDER = 2,
  CANVAS_COLOR = 'gray',
  DELAY = 200,
  // LEFT_MENU_WIDTH = 40,
  AMOUNT_PART_BY_LEVEL: AmountPartByLevel = {
    '0': 3,
    '1': 4,
    '2': 5,
  }

const CanvasComponent: React.FC<Props> = ({ setScores, level }) => {
  const ref = useRef(null)

  const sourceFullWidth = 600,
    sourceFullHeight = 600,
    imgAmountX = AMOUNT_PART_BY_LEVEL[level],
    imgAmountY = AMOUNT_PART_BY_LEVEL[level],
    sourceWidth = Math.floor(sourceFullWidth / imgAmountX),
    sourceHeight = Math.floor(sourceFullHeight / imgAmountY)

  // const winWidth = window.innerWidth - LEFT_MENU_WIDTH,
  //   winHeight = window.innerHeight

  // const k = Math.min(winWidth / sourceFullWidth, winHeight / sourceFullHeight)

  const maxWidth = sourceFullWidth
  const maxHeight = sourceFullHeight

  const imgPartWidth = Math.floor((maxWidth - 2 * IMG_BORDER - (imgAmountX - 1) * IMG_DIVIDER) / imgAmountX),
    imgPartHeight = Math.floor((maxHeight - 2 * IMG_BORDER - (imgAmountY - 1) * IMG_DIVIDER) / imgAmountY),
    canvasWidth = imgPartWidth * imgAmountX + 2 * IMG_BORDER + (imgAmountX - 1) * IMG_DIVIDER,
    canvasHeight = imgPartHeight * imgAmountY + 2 * IMG_BORDER + (imgAmountY - 1) * IMG_DIVIDER

  useEffect(() => {
    if (ref.current) {
      const canvas: HTMLCanvasElement = ref.current
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.fillStyle = CANVAS_COLOR
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        let finished = false
        let start = 0
        const startPos: Position[] = []
        let draggable: ImageObj | null = null,
          first: ImageObj | null = null,
          second: ImageObj | null = null
        let startAnimate = 0

        for (let x = 0; x < imgAmountX; x++) {
          for (let y = 0; y < imgAmountY; y++) {
            startPos.push({
              posX: x * (imgPartWidth + IMG_DIVIDER) + IMG_BORDER,
              posY: y * (imgPartHeight + IMG_DIVIDER) + IMG_BORDER,
            })
          }
        }
        const imgArr: ImageObj[] = []
        for (let x = 0; x < imgAmountX; x++) {
          for (let y = 0; y < imgAmountY; y++) {
            const imageElement = new Image()

            imageElement.onload = function () {
              const sourceX = x * sourceWidth
              const sourceY = y * sourceHeight
              const destWidth = imgPartWidth
              const destHeight = imgPartHeight
              const origX = x * (imgPartWidth + IMG_DIVIDER) + IMG_BORDER
              const origY = y * (imgPartHeight + IMG_DIVIDER) + IMG_BORDER
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
                imageElement,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                posX,
                posY,
                destWidth,
                destHeight,
                origX,
                origY,
              })
              ctx.drawImage(
                imageElement,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                posX,
                posY,
                destWidth,
                destHeight
              )
              start = Date.now()
            }
            imageElement.src = `/assets/images/cheburashka.png`
          }
        }

        canvas.onmousedown = e => {
          if (!finished) {
            for (const imgObj of imgArr) {
              if (
                e.offsetX > imgObj.posX &&
                e.offsetX < imgObj.posX + imgPartWidth &&
                e.offsetY > imgObj.posY &&
                e.offsetY < imgObj.posY + imgPartHeight
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
              if (
                e.offsetX > imgObj.posX &&
                e.offsetX < imgObj.posX + imgPartWidth &&
                e.offsetY > imgObj.posY &&
                e.offsetY < imgObj.posY + imgPartHeight
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

              draggable.posX = posX
              draggable.posY = posY
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
            const {
              imageElement,
              posX,
              posY,
              origX,
              origY,
              sourceX,
              sourceY,
              sourceWidth,
              sourceHeight,
              destWidth,
              destHeight,
            } = imgObj
            ctx.drawImage(imageElement, sourceX, sourceY, sourceWidth, sourceHeight, posX, posY, destWidth, destHeight)
            if (result && (posX !== origX || posY !== origY)) {
              result = false
            }
          }
          ;[second, first, draggable].map(moved => {
            if (moved) {
              const {
                imageElement,
                currX = 0,
                currY = 0,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                destWidth,
                destHeight,
              } = moved
              ctx.drawImage(
                imageElement,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                currX,
                currY,
                destWidth,
                destHeight
              )
            }
          })
          if (result && !finished) {
            const levelNum = Number(level)
            let scores = Math.round((20000 * (1 + levelNum * levelNum) - (Date.now() - start)) / 100)
            scores < 0 && (scores = 0)
            finished = true
            setTimeout(() => {
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
              first.currX = calculateCoord(first.fromX, first.posX, t)
              first.currY = calculateCoord(first.fromY, first.posY, t)
            }
            if (second && second.fromX && second.fromY) {
              second.currX = calculateCoord(second.fromX, second.posX, t)
              second.currY = calculateCoord(second.fromY, second.posY, t)
            }
          }
          refreshCanvas()
          if (first) {
            requestAnimationFrame(animate)
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={ref} width={canvasWidth} height={canvasHeight} />
}

export default CanvasComponent
