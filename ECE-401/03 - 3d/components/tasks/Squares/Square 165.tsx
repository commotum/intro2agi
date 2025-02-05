import type { P5Task } from '../types'
import p5 from 'p5'

const task: P5Task = {
  width: 512,
  height: 512,
  draw: (p: p5) => {
    // Set white background
    p.background(255)
    
    // Draw a black square
    // centered at (x,y)
    // with side length s
    // p.square(x, y, s)
    p.fill(0)
    p.rectMode(p.CENTER)
    p.square(32, 164, 74)
  }
}

export default task
