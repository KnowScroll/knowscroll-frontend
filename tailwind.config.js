import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gradient Background App',
  description: 'Next.js app with black background and color gradients',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} gradient-background`}>
        {children}
      </body>
    </html>
  )
}