'use client'

import { useState, useEffect } from 'react'
import { 
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface Task {
  name: string
  component: any
}

interface TaskGroup {
  name: string
  tasks: Task[]
}

interface AppSidebarProps {
  onTaskSelect: (component: any) => void
}

export function AppSidebar({ onTaskSelect }: AppSidebarProps) {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([])
  const [selectedTask, setSelectedTask] = useState<any>(null)

  useEffect(() => {
    async function loadTasks() {
      // Load Circles tasks
      const circlesContext = require.context('@/components/tasks/Circles', false, /T_circle.*\.tsx?$/)
      const circlesModules = await Promise.all(
        circlesContext.keys().map(key => import(`@/components/tasks/Circles/${key.slice(2)}`))
      )
      const circlesTasks = circlesModules.map((module, index) => ({
        name: `Circle ${index + 1}`,
        component: Object.values(module)[0]
      }))

      // Load ARC-AGI tasks (assuming similar structure)
      const arcContext = require.context('@/components/tasks/ARC-AGI', false, /T_.*\.tsx?$/)
      const arcModules = await Promise.all(
        arcContext.keys().map(key => import(`@/components/tasks/ARC-AGI/${key.slice(2)}`))
      )
      const arcTasks = arcModules.map((module, index) => ({
        name: `Task ${index + 1}`,
        component: Object.values(module)[0]
      }))

      setTaskGroups([
        { name: 'Circles', tasks: circlesTasks },
        { name: 'ARC-AGI', tasks: arcTasks }
      ])
    }

    loadTasks()
  }, [])

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task.component)
    onTaskSelect(task.component)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-semibold">Tasks</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {taskGroups.map((group) => (
            <Collapsible key={group.name} defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <div className="flex items-center justify-between w-full">
                      {group.name}
                      <span className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90">
                        <ChevronRight size={16} />
                      </span>
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {group.tasks.map((task) => (
                      <SidebarMenuSubItem key={task.name}>
                        <SidebarMenuSubButton
                          onClick={() => handleTaskSelect(task)}
                          className={selectedTask === task.component ? 'bg-accent' : ''}
                        >
                          {task.name}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
