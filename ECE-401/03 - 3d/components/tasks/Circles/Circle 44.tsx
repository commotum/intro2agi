import type { P5Task } from '../types'
import p5 from 'p5'

const task: P5Task = {
  width: 512,
  height: 512,
  draw: (p: p5) => {
    // Set white background
    p.background(255)
    
    // Draw a black circle
    // centered at (x,y)
    // with d diameter
    // p.circle(x, y, d)
    p.fill(0)
    p.circle(143, -39, 46)
  }
}

export default task
