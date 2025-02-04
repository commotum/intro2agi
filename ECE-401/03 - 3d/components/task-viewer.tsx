import P5Component from '@/components/p5'
import CodeBlock from '@/components/ui/codeblock'
import { Task } from '@/lib/types' // Adjust import path as needed

interface TaskViewerProps {
  task: Task
}

export function TaskViewer({ task }: TaskViewerProps) {
  return (
    <div className="flex gap-8 p-4">
      <div className="flex-1 flex items-center justify-center">
        <P5Component task={task} />
      </div>
      <div className="w-[512px] h-[512px]">
        <CodeBlock filePath={task.filePath} />
      </div>
    </div>
  )
}