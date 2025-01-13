'use client'

import React, { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import p5 from 'p5'
import type { P5Task } from './tasks/types'

interface P5ComponentProps {
  task: P5Task
}

const P5Component = ({ task }: P5ComponentProps) => {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(480, 480, p.WEBGL)
        canvas.parent(canvasRef.current!)
      }

      p.draw = () => {
        task.draw(p)
      }
    }

    const p5Instance = new p5(sketch)

    return () => {
      p5Instance.remove()
    }
  }, [task])

  return (
    <Card className="w-[480px] h-[480px] overflow-hidden bg-black">
      <div ref={canvasRef} className="w-full h-full" />
    </Card>
  )
}

export default P5Component