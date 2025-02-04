'use client'

import P5Component from '@/components/p5'
import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import CodeBlock from '@/components/ui/codeblock'

export default function Home() {
  const [selectedTask, setSelectedTask] = useState<any>(null)

  return (
    <div className="flex h-full w-full">
      <AppSidebar onTaskSelect={setSelectedTask} />
      <main className="flex-1 flex items-center justify-center gap-8 p-4">
        {selectedTask && (
          <>
            <div className="flex-1 h-full flex items-center justify-center">
              <P5Component task={selectedTask} />
            </div>
            <div className="w-[512px] h-[512px]">
              <CodeBlock filePath={selectedTask.filePath} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
