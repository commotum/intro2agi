import p5 from 'p5'

export interface P5Task {
  draw: (p: p5) => void
}