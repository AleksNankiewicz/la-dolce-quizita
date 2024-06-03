import { Compass, Home, PlusSquare, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type BottomNavbarProps = {
  children: React.ReactNode
}

const BottomNavbar = ({ children }: BottomNavbarProps) => {
  return (
    <div className="fixed bottom-0 left-0 bg-background p-4 z-50 w-full flex justify-evenly border-t md:hidden">
      {children}
    </div>
  )
}

export default BottomNavbar
