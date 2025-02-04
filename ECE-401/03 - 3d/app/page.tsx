'use client'

import P5Component from '@/components/p5'
import { useState } from 'react'
import { T_circle } from '@/components/tasks/Circles/T_circle_2ff940e7'
import { AppSidebar } from '@/components/app-sidebar'

export default function Home() {
  const [selectedTask, setSelectedTask] = useState(T_circle)

  return (
    <div className="flex h-full w-full">
      <AppSidebar onTaskSelect={setSelectedTask} />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full h-full flex items-center justify-center">
          <P5Component task={selectedTask} />
        </div>
      </main>
    </div>
  )
}
