import P5Component from '@/components/p5'
import CodeBlock from '@/components/ui/codeblock'
import { P5Task } from './tasks/types'
import { useState } from 'react'

interface TaskViewerProps {
  task: P5Task & { filePath: string }
}

export function TaskViewer({ task }: TaskViewerProps) {
  const [dimensions, setDimensions] = useState({ width: task.width, height: task.height });

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex gap-8 p-4 max-w-[2000px]">
        <div className="flex items-center justify-center">
          <P5Component 
            task={task} 
            onDimensionsChange={setDimensions}
          />
        </div>
        <div className="flex items-center justify-center">
          <CodeBlock 
            filePath={task.filePath} 
            dimensions={dimensions}
          />
        </div>
      </div>
    </div>
  )
}