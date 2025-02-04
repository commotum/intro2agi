import p5 from 'p5'

export interface P5Task {
  /** Width of the canvas in pixels */
  width: number
  /** Height of the canvas in pixels */ 
  height: number
  draw: (p: p5) => void
}