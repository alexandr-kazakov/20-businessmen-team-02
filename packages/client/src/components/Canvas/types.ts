export type Position = {
	posX: number,
	posY: number
}
export type ImageObj = {
	imageElement: HTMLImageElement,
	posX: number,
	posY: number,
	origX: number,
	origY: number,
	currX?: number,
	currY?: number,
}
type OwnProps = {
  setScores: (value: number) => void;
}
export type Props = OwnProps