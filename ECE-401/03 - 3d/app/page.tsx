'use client'

import P5Component from '@/components/features/p5'
import { TaskBrowser } from '@/components/features/task-browser'
import { useState } from 'react'
import { T_circle } from '@/components/tasks/T_circle' // Default task

export default function Home() {
  const [selectedTask, setSelectedTask] = useState(T_circle)

  return (
    <div className="flex h-screen">
      <TaskBrowser 
        onSelectTask={setSelectedTask}
        selectedTask={selectedTask}
      />
      <div className="flex-1">
        <P5Component task={selectedTask} />
      </div>
    </div>
  )
}