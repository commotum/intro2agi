'use client'

import { useState, useEffect, useCallback } from 'react'
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
  SidebarMenuBadge,
  SidebarFooter
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Circle, Blocks, Square, PocketKnife } from 'lucide-react'
import type { P5Task } from '@/components/tasks/types'

type TaskWithPath = P5Task & { 
  name: string;
  filePath: string;
  componentPath: string;
  setup?: () => void;
  draw: () => void;
}

interface TaskGroup {
  name: string;
  tasks: TaskWithPath[];
}

interface TaskProps {
  onTaskSelect: (task: TaskWithPath) => void;
}

export function AppSidebar({ onTaskSelect }: TaskProps) {
  const [groups, setGroups] = useState<TaskGroup[]>([])
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  const handleTaskSelect = useCallback(async (task: TaskWithPath) => {
    try {
      const TaskComponent = (await import(`@/components/${task.componentPath}`)).default
      setSelectedTask(task.componentPath)
      onTaskSelect({
        ...task,
        setup: TaskComponent.setup || undefined,
        draw: TaskComponent.draw,
      })
    } catch (error) {
      console.error('Error loading task component:', error)
    }
  }, [onTaskSelect])

  useEffect(() => {
    if (typeof window === 'undefined') return;

    async function fetchTaskGroups() {
      try {
        const response = await fetch('/api/tasks')
        const groups = await response.json()
        setGroups(groups)
        
        // Find and select the rotating cube task by default
        const miscGroup = groups.find((g: TaskGroup) => g.name.toLowerCase() === 'z misc')
        if (miscGroup) {
          const rotatingCubeTask = miscGroup.tasks.find((t: { name: string }) => t.name.includes('Rotating Cube'))
          if (rotatingCubeTask) {
            await handleTaskSelect(rotatingCubeTask)
          }
        }
      } catch (error) {
        console.error('Error fetching task groups:', error)
      }
    }
    fetchTaskGroups()
  }, [handleTaskSelect])

  const getGroupIcon = (groupName: string) => {
    switch (groupName.toLowerCase()) {
      case 'arc-agi':
        return <Blocks size={16} className="mr-2" />
      case 'circles':
        return <Circle size={16} className="mr-2" />
      case 'z misc':
        return <PocketKnife size={16} className="mr-2" />
      case 'squares':
        return <Square size={16} className="mr-2" />
      default:
        return null
    }
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
          {groups.map((group) => (
            <Collapsible 
              key={group.name} 
              defaultOpen={group.name.toLowerCase() === 'z misc'}
              className="group/collapsible px-2"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        {getGroupIcon(group.name)}
                        {group.name}
                      </div>
                      <SidebarMenuBadge>{group.tasks.length}</SidebarMenuBadge>
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