'use client'

import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { TaskViewer } from '@/components/task-viewer'

export default function Home() {
  const [selectedTask, setSelectedTask] = useState<any>(null)

  return (
    <div className="flex h-full w-full">
      <AppSidebar onTaskSelect={setSelectedTask} />
      <main className="flex-1">
        {selectedTask && <TaskViewer task={selectedTask} />}
      </main>
    </div>
  )
}
