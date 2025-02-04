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
import dynamic from 'next/dynamic'

interface Task {
  name: string
  componentPath: string
  filePath: string
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
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  useEffect(() => {
    // Fetch task groups from the API
    async function fetchTaskGroups() {
      const response = await fetch('/api/tasks')
      const groups = await response.json()
      setTaskGroups(groups)
    }
    fetchTaskGroups()
  }, [])

  const handleTaskSelect = async (task: Task) => {
    const TaskComponent = (await import(`@/components/${task.componentPath}`)).T_circle
    setSelectedTask(task.componentPath)
    onTaskSelect({...TaskComponent, filePath: task.filePath})
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
            <Collapsible key={group.name} defaultOpen className="group/collapsible px-2">
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
                          className={selectedTask === task.componentPath ? 'bg-accent' : ''}
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
