import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-circular-progressbar/dist/styles.css'

import { AppProvider } from '@/components/Appcontext'

import { Toaster } from 'react-hot-toast'
import BottomNavbar from '@/components/layouts/BottomNavbar'
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper'
import { cn } from '@/lib/utils'
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
      <body className={cn(inter.className)}>
        <AppProvider>
          <MaxWidthWrapper>
            <div className="min-h-[90vh] mt-20 md:mt-[68px] mr-0 px-0">
              {children}
            </div>
            <Toaster />
          </MaxWidthWrapper>
        </AppProvider>
      </body>
    </html>
  )
}
