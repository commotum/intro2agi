import type { P5Task } from '../types'
import p5 from 'p5'

const task: P5Task = {
  width: 512,
  height: 512,
  draw: (p: p5) => {
    // Set white background
    p.background(255)
    
    // Draw black circle in the middle
    p.fill(0)
    //p.strokeWeight(0)
    p.circle(0, 0, 128)
  }
}

export default task