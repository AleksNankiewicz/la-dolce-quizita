import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'
import { AppProvider } from '@/components/Appcontext'
import { ToastContainer } from 'react-toastify'

import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'La Dolce Quizita',
  description:
    'Przygotuj się na wirtualną podróż po Włoszech! Odkryj niezwykłe tajemnice tego urokliwego kraju w naszym fascynującym quizie.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <div className="max-w-screen-xl mx-auto min-h-screen">
            <Navbar />
            <div className="min-h-screen">{children}</div>
            {/* <Footer /> */}
            <Toaster />
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
