import type { P5Task } from './types'
import p5 from 'p5'

export const T_circle: P5Task = {
  width: 512,
  height: 512,
  draw: (p: p5) => {
    // Set white background
    p.background(255)
    
    // Draw black circle in the middle
    p.fill(0)
    p.circle(-158.80741619649092, -63.35257552831041, 64.18116402143654)
  }
}
