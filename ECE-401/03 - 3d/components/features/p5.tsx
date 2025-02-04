'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import p5 from 'p5'
import type { P5Task } from '../tasks/types'

interface P5ComponentProps {
  task: P5Task
}

const P5Component = ({ task }: P5ComponentProps) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isOrtho, setIsOrtho] = useState(true)
  const p5InstanceRef = useRef<p5 | null>(null)
  
  useEffect(() => {
    if (!canvasRef.current) return

    const sketch = (p: p5) => {
      const state = {
        dragging: false,
        lastMouseX: 0,
        lastMouseY: 0,
        rotationX: 0,
        rotationY: 0,
        velocityX: 0,
        velocityY: 0,
        decay: 0.95,
        isOrthographic: isOrtho
      }

      p.setup = () => {
        const canvas = p.createCanvas(task.width, task.height, p.WEBGL)
        canvas.parent(canvasRef.current!)
        p.smooth()
      }

      const updateCamera = () => {
        if (!state.dragging) {
          state.rotationX += state.velocityX
          state.rotationY += state.velocityY
          state.velocityX *= state.decay
          state.velocityY *= state.decay
        }
        
        p.camera()  // Reset to default camera settings
        
        if (state.isOrthographic) {
          p.ortho()
        }
        // No else needed - perspective is the default
        
        p.rotateX(state.rotationX)
        p.rotateY(state.rotationY)
      }

      p.mousePressed = () => {
        if (p.mouseX >= 0 && p.mouseX <= task.width && p.mouseY >= 0 && p.mouseY <= task.height) {
          state.dragging = true
          state.lastMouseX = p.mouseX
          state.lastMouseY = p.mouseY
          state.velocityX = 0
          state.velocityY = 0
        }
      }

      p.mouseReleased = () => {
        if (state.dragging) {
          state.dragging = false
          state.velocityX = (p.mouseX - state.lastMouseX) * 0.01
          state.velocityY = (state.lastMouseY - p.mouseY) * 0.01
        }
      }

      p.mouseDragged = () => {
        if (state.dragging) {
          const deltaX = p.mouseX - state.lastMouseX
          const deltaY = p.mouseY - state.lastMouseY
          
          state.rotationY += deltaX * 0.01
          state.rotationX -= deltaY * 0.01
          
          state.lastMouseX = p.mouseX
          state.lastMouseY = p.mouseY
        }
      }

      p.draw = () => {
        state.isOrthographic = isOrtho
        p.background(0)
        updateCamera()
        task.draw(p)
      }
    }

    const p5Instance = new p5(sketch)
    p5InstanceRef.current = p5Instance

    return () => {
      p5Instance.remove()
      p5InstanceRef.current = null
    }
  }, [task, isOrtho])

  return (
    <div className="flex flex-col gap-4">
      <Card 
        className="overflow-hidden bg-black"
        style={{ width: `${task.width}px`, height: `${task.height}px` }}
      >
        <div ref={canvasRef} className="w-full h-full" />
      </Card>
      <Switch 
        checked={isOrtho}
        onCheckedChange={setIsOrtho}
      />
    </div>
  )
}

export default P5Component