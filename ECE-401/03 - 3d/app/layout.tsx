import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from './layout-client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'intro2agi',
  description: 'Training Data for Visual Reasoning',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={`${inter.className} h-full w-full`}>
        <ClientLayout className={inter.className}>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}