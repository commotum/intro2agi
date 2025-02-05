import type { P5Task } from '../types'
import p5 from 'p5'

const matrix = [
  [0, 0, 0, 7, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 7, 0, 7, 0, 0, 0],
  [7, 0, 7, 7, 0, 7, 7, 0, 7],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [7, 0, 7, 7, 0, 7, 7, 0, 7],
  [0, 0, 0, 7, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 7, 0, 7, 0, 0, 0]
]

const task: P5Task = {
  width: 512,
  height: 512,
  draw: (p: p5) => {
    p.background(0)
    
    const gridSize = 9
    const cubeSize = 32
    const spacing = cubeSize
    
    // Start drawing from the top-left corner of our grid
    const startX = -((gridSize - 1) * spacing) / 2
    const startY = -((gridSize - 1) * spacing) / 2
    
    // Draw grid
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (matrix[j][i] === 7) {
          p.push()
          const x = startX + (i * spacing)
          const y = startY + (j * spacing)
          p.translate(x, y, 0)
          p.fill('#f08b3b')
          p.box(cubeSize)
          p.pop()
        }
      }
    }
  }
}

export default task