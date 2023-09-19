"use client"
import './globals.css'
import { AuthUserProvider } from '@/firebase/auth'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ weight:'400', subsets: ['latin'] })

export const metadata = {
  title: 'Image Gallery',
  description: 'Nextjs + Firebase + Tailwindcss',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} max-w-4xl mx-auto mt-10`}>
      <AuthUserProvider>
        {children}
      </AuthUserProvider>
        </body>
    </html>
  )
}
