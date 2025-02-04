'use client'

import { useState, useEffect } from 'react'
import { 
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'
import { T_circle } from '@/components/tasks/Circles/T_circle_2ff940e7'
// Import other tasks here

const TASKS = [
  { name: 'Circle', component: T_circle },
  // Add other tasks here
]

interface TaskBrowserProps {
  onSelectTask: (task: any) => void
  selectedTask: any
}

export function TaskBrowser({ onSelectTask, selectedTask }: TaskBrowserProps) {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    async function loadTasks() {
      const context = require.context('@/components/tasks/circles', false, /T_circle.*\.tsx?$/)
      const modules = await Promise.all(
        context.keys().map(key => import(`@/components/tasks/circles/${key.slice(2)}`))
      )

      const loadedTasks = modules.map((module, index) => ({
        name: `Circle ${index + 1}`,
        component: Object.values(module)[0]
      }))

      setTasks(loadedTasks)
    }

    loadTasks()
  }, [])

  return (
    <SidebarProvider>
      <Sidebar defaultCollapsed>
        <SidebarHeader>
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-semibold">Tasks</h2>
            <SidebarMenuButton>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </SidebarMenuButton>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {tasks.map(({ name, component }) => (
              <SidebarMenuItem key={name}>
                <SidebarMenuButton
                  onClick={() => onSelectTask(component)}
                  isActive={selectedTask === component}
                >
                  {name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}