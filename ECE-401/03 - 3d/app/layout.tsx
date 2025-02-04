import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'intro2agi',
  description: 'Using p5.js to learn about AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={`${inter.className} h-full w-full`}>
        <SidebarProvider>
          <div className="flex h-full w-full">
            <AppSidebar />
            <main className="flex-1 relative">
              <SidebarTrigger className="absolute top-4 left-4 z-50" />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
