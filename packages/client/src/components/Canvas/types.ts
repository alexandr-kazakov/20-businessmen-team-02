export type Position = {
  posX: number
  posY: number
}

export type ImageObj = {
  imageElement: HTMLImageElement
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
  destWidth: number
  destHeight: number
  fromX?: number
  fromY?: number
}

type OwnProps = {
  setScores: (value: number) => void
  level: string
}

export type Props = OwnProps

export type AmountPartByLevel = {
  [key: string]: number
}
