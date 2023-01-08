export type Position = {
  posX: number
  posY: number
}

export type ImageObj = {
  posX: number
  posY: number
  origX: number
  origY: number
  currX?: number
  currY?: number
  sourceX: number
  sourceY: number
  sourceWidth: number
  sourceHeight: number
  fromX?: number
  fromY?: number
}

type OwnProps = {
  className: string
  setScores: (value: number) => void
  level: string
  initStart: number
}

export type Props = OwnProps

export type AmountPartByLevel = {
  [key: string]: number
}
