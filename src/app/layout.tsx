import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-circular-progressbar/dist/styles.css'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'
import { AppProvider } from '@/components/Appcontext'
import { ToastContainer } from 'react-toastify'

import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuizyMania',
  description:
    'QuizyMania to platforma, która zapewnia entuzjastom quizów możliwość eksplorowania różnorodnych tematów i testowania swojej wiedzy w przyjaznej i interaktywnej atmosferze.',
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
          <div className="max-w-screen-xl mx-auto min-h-[90vh]">
            <Navbar />
            <div className="min-h-[90vh]">{children}</div>
            {/* <Footer /> */}
            <Toaster />
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
