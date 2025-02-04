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
    p.circle(-136.95458601859622, -162.09352841661405, 146.91257341950896)
  }
}
