'use client'

import P5Component from '@/components/p5'
import { wave } from '@/components/tasks/wave'
import { rotatingCube } from '@/components/tasks/rotatingCube'
import { T_0692e18c } from '@/components/tasks/T_0692e18c'
import { T_circle } from '@/components/tasks/T_circle'

export default function Home() {
  return (
    <div>
      <P5Component task={T_circle} />
    </div>
  )
}