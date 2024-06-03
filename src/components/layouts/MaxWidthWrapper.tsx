import { cn } from '@/lib/utils'
import React from 'react'

type MaxWidthWrapperProps = {
  children?: React.ReactNode
  className?: string
}

const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        'w-[90%] md:w-[85%] lg:w-[80%] max-w-[1024px]  mx-auto  z-10',
        className
      )}
    >
      {children}
    </div>
  )
}

export default MaxWidthWrapper
