import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/navigation/Navbar';
import { ThemeProvider } from '@/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Know Scroll',
  description: 'hehe! you are at the right place',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} gradient-background`}>
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}