'use client'

import P5Component from '@/components/p5'
import { wave } from '@/components/tasks/wave'
import { rotatingCube } from '@/components/tasks/rotatingCube'

export default function Home() {
  return (
    <div>
      <P5Component task={rotatingCube} />
    </div>
  )
}