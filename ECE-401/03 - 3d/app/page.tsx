'use client'

import P5Component from '@/components/p5'
import { useState } from 'react'
import { T_circle } from '@/components/tasks/Circles/T_circle_2ff940e7'
import { AppSidebar } from '@/components/app-sidebar'
import CodeBlock from '@/components/ui/codeblock'

export default function Home() {
  const [selectedTask, setSelectedTask] = useState(T_circle)

  return (
    <div className="flex h-full w-full">
      <AppSidebar onTaskSelect={setSelectedTask} />
      <main className="flex-1 flex items-center justify-center gap-8 p-4">
        <div className="flex-1 h-full flex items-center justify-center">
          <P5Component task={selectedTask} />
        </div>
        <div className="w-[512px] h-[512px]">
          <CodeBlock filePath={selectedTask.filePath} />
        </div>
      </main>
    </div>
  )
}
