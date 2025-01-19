import type { P5Task } from './types'
import p5 from 'p5'

export const rotatingCube: P5Task = {
  draw: (p: p5) => {
    p.background(0)
    p.rotateX(p.frameCount * 0.01)
    p.rotateY(p.frameCount * 0.01)
    p.fill(0, 0, 255) // Blue color
    p.box(100) // Size of the cube
  }
}