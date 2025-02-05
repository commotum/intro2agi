import type { P5Task } from '../types'
import p5 from 'p5'

const task: P5Task = {
  width: 512,
  height: 512,
  draw: (p: p5) => {
    // Set black background
    p.background(0)
    
    // Rotate cube
    p.rotateX(p.frameCount * 0.02)
    p.rotateY(p.frameCount * 0.03)
    
    // Draw blue cube
    p.fill(0, 0, 255)  // Blue color
    p.box(128)  // Size of the cube
  }
}

export default task