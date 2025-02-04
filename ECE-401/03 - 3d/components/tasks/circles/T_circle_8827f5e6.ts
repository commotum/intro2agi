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
    p.circle(-130.5350647605726, 120.25001062008778, 57.46137275440542)
  }
}
