'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function ClientLayout({
  children,
  className
}: {
  children: React.ReactNode,
  className: string
}) {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <AppSidebar onTaskSelect={(_task) => {}} />
        <main className="flex-1 relative flex">
          <SidebarTrigger className="absolute top-4 left-4 z-50" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}