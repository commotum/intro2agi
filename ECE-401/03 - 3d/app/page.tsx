'use client'

import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { TaskViewer } from '@/components/task-viewer'
import { useSidebar } from '@/components/ui/sidebar'

export default function Home() {
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const { state } = useSidebar()

  return (
    <div className="flex w-full h-full">
      <AppSidebar onTaskSelect={setSelectedTask} />
      <div className={`flex-1 flex items-center justify-center transition-[padding] duration-200 ease-linear ${state === 'expanded' ? 'pr-64' : ''}`}>
        {selectedTask && <TaskViewer task={selectedTask} />}
      </div>
    </div>
  )
}
