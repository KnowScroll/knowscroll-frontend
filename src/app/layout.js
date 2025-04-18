import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/navigation/Navbar';
import BottomNav from './components/navigation/BottomNav';
import { ThemeProvider } from '@/providers/ThemeProvider';
import ClientOnly from './components/ClientOnly';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Know Scroll',
  description: 'hehe! you are at the right place',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={`${inter.className} gradient-background`}
      >
        <ThemeProvider>
          <ClientOnly>
            <Navbar />
          </ClientOnly>
          <main className="pt-16 pb-20">
            <>
              {children}
            </>
          </main>
          <ClientOnly>
            <BottomNav />
          </ClientOnly>
        </ThemeProvider>
      </body>
    </html>
  );
}