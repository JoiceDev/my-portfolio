import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Joice | Full Stack Developer',
  description: 'Portfólio profissional de Joice, desenvolvedora full stack com foco em React, TypeScript, Node.js e Java.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
