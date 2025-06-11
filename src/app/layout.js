import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Joice | Full Stack Developer',
  description: 'Professional portfolio of Joice, a full stack developer specializing in React, TypeScript, Node.js, and Java.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
