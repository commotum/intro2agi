'use client'

import { useEffect, useState } from 'react'

interface Task {
  name: string
  component: any // We'll improve this type later
}

interface TaskSidebarProps {
  onSelectTask: (task: any) => void
  selectedTask: any
}

export function TaskSidebar({ onSelectTask, selectedTask }: TaskSidebarProps) {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    async function loadTasks() {
      try {
        // Using Vite's import.meta.glob to dynamically import all task files
        const taskModules = import.meta.glob('/components/tasks/*.ts')
        const loadedTasks: Task[] = []

        for (const path in taskModules) {
          const module = await taskModules[path]()
          const taskName = path.split('/').pop()?.replace('.ts', '') || ''
          
          // Get the first export from the module
          const taskComponent = Object.values(module)[0]
          
          loadedTasks.push({
            name: taskName,
            component: taskComponent
          })
        }

        setTasks(loadedTasks)
      } catch (error) {
        console.error('Error loading tasks:', error)
      }
    }

    loadTasks()
  }, [])

  return (
    <div className="w-64 bg-gray-100 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <div className="space-y-2">
        {tasks.map(({ name, component }) => (
          <button
            key={name}
            onClick={() => onSelectTask(component)}
            className={`w-full text-left px-3 py-2 rounded ${
              selectedTask === component ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}