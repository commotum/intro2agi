import type { P5Task } from './types'
import p5 from 'p5'

// Ensure we're properly exporting a P5Task object with a draw method
export const wave: P5Task = {
  width: 512,
  height: 512,
  draw: (p: p5) => {
    p.background(0)
    p.stroke(0, 255, 255)
    p.noFill()
    
    // Adjust position for WEBGL mode (0,0 is center)
    p.rotateX(p.PI / 3)
    
    const time = p.frameCount * 0.05
    
    // Create wave pattern
    for (let x = -240; x < 240; x += 20) {
      for (let z = -100; z < 100; z += 20) {
        const y = p.sin(x * 0.05 + z * 0.05 + time) * 50
        p.push()
        p.translate(x, y, z)
        p.sphere(5)
        p.pop()
      }
    }
  }
}