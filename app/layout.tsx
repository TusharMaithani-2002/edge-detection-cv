import NavBar from '@/components/NavBar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'tailwindcss/tailwind.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Object Detectiion in js',
  description: 'This is a computer vision project to implement various cv techniques',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div className=''>
        {children}
        </div>
      </body>
    </html>
  )
}
