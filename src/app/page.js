import './globals.css'
import { Inter } from 'next/font/google'
import { Hero, ReelsSection } from './components/sections'
import Navbar from './components/navigation/Navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gradient Background App',
  description: 'Next.js app with black background and color gradients',
}

export default function RootLayout({ children }) {
  return (
    <>
      {/* {children} */}
      <Navbar />
      <ReelsSection />
      <Hero />
    </>
  )
}