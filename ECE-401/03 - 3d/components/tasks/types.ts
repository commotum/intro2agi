import p5 from 'p5'

export interface P5Task {
  width: number
  height: number
  draw: (p: p5) => void
}