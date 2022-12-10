import React, { useRef, useEffect, FC } from 'react'
import { getRandomInt } from './helper'
import { Position, ImageObj, Props } from './types'

const CANVAS_HEIGHT = 644,
  CANVAS_WIDTH = 644,
  IMG_X_AMOUNT = 3,
  IMG_Y_AMOUNT = 3,
  IMG_SIZE_X = 200,
  IMG_SIZE_Y = 200,
  IMG_BORDER = 20,
  IMG_DIVIDER = 2,
  CANVAS_COLOR = 'gray',
  DELAY = 200

const CanvasComponent: FC<Props> = ({ setScores }) => {
  const ref = useRef(null)

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

        for (let x = 0; x < IMG_X_AMOUNT; x++) {
          for (let y = 0; y < IMG_Y_AMOUNT; y++) {
            startPos.push({
              posX: x * (IMG_SIZE_X + IMG_DIVIDER) + IMG_BORDER,
              posY: y * (IMG_SIZE_Y + IMG_DIVIDER) + IMG_BORDER,
            })
          }
        }
        const imgArr: ImageObj[] = []
        let draggable: ImageObj | null = null
        for (let x = 0; x < IMG_X_AMOUNT; x++) {
          for (let y = 0; y < IMG_Y_AMOUNT; y++) {
            const imageElement = new Image()

            imageElement.onload = function () {
              const sourceX = x * 200
              const sourceY = y * 200
              const sourceWidth = IMG_SIZE_X
              const sourceHeight = IMG_SIZE_Y
              const destWidth = sourceWidth
              const destHeight = sourceHeight
              const origX = x * (IMG_SIZE_X + IMG_DIVIDER) + IMG_BORDER
              const origY = y * (IMG_SIZE_Y + IMG_DIVIDER) + IMG_BORDER
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
            imageElement.src = `src/assets/images/cheburashka.png`
          }
        }

        canvas.onmousedown = e => {
          if (!finished) {
            for (const imgObj of imgArr) {
              if (
                e.offsetX > imgObj.posX &&
                e.offsetX < imgObj.posX + IMG_SIZE_X &&
                e.offsetY > imgObj.posY &&
                e.offsetY < imgObj.posY + IMG_SIZE_Y
              ) {
                draggable = imgObj
                draggable.currX = e.offsetX - IMG_SIZE_X / 2
                draggable.currY = e.offsetY - IMG_SIZE_Y / 2
                break
              }
            }
          }
        }

        canvas.onmousemove = e => {
          if (draggable) {
            draggable.currX = e.offsetX - IMG_SIZE_X / 2
            draggable.currY = e.offsetY - IMG_SIZE_Y / 2
            requestAnimationFrame(refreshCanvas)
          }
        }

        canvas.onmouseup = e => {
          if (draggable) {
            let second: ImageObj | null = null
            for (const imgObj of imgArr) {
              if (
                e.offsetX > imgObj.posX &&
                e.offsetX < imgObj.posX + IMG_SIZE_X &&
                e.offsetY > imgObj.posY &&
                e.offsetY < imgObj.posY + IMG_SIZE_Y
              ) {
                second = imgObj
                break
              }
            }
            if (second) {
              const { posX, posY } = second
              second.posX = draggable.posX
              second.posY = draggable.posY
              draggable.posX = posX
              draggable.posY = posY
            }

            draggable = null
            refreshCanvas()
          }
        }
        canvas.onmouseout = () => {
          if (draggable) {
            draggable.currX = draggable.posX
            draggable.currY = draggable.posY
            draggable = null
            refreshCanvas()
          }
        }

        const refreshCanvas = () => {
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          let result = true
          for (const imgObj of imgArr) {
            if (imgObj === draggable) {
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
          if (draggable) {
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
            } = draggable
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
          if (result) {
            let scores = 20000 - (Date.now() - start)
            scores < 0 && (scores = 0)
            finished = true
            setTimeout(() => {
              // TODO - переход на страницу окончания игры
              setScores(scores)
            }, DELAY)
          }
        }
      }
    }
  }, [])

  return <canvas ref={ref} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
}

export default CanvasComponent
