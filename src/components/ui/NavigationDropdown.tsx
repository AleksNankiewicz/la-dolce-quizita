'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowDown, ChevronDown, Menu, User } from 'lucide-react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export type TSubHeader = {
  title: string
  href: string
  icon?: React.ReactNode
}

type NavigationDropdownProps = {
  subHeaders: TSubHeader[]
  trigger: React.ReactNode
  position?: 'left' | 'right'
}

const NavigationDropdown = ({
  subHeaders,
  trigger,
  position = 'left',
}: NavigationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathName = usePathname()

  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current?.contains(event.target as Node) ||
        dropdownRef.current?.contains(event.target as Node)
      ) {
        // Clicked inside the button or the dropdown, do nothing
        return
      }

      // Clicked outside the button and the dropdown, close the dropdown
      setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathName])

  return (
    <div
      onMouseEnter={() => {
        !isTouchDevice() && setIsOpen(true)
      }}
      onMouseLeave={() => {
        !isTouchDevice() && setIsOpen(false)
      }}
      // onClick={handleButtonClick}
      className=" relative"
    >
      <Button
        variant={'outline'}
        onClick={handleButtonClick}
        ref={buttonRef}
        className=""
      >
        {trigger}

        {/* <Menu size={27} className="sm:hidden" /> */}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={dropdownRef}
            // onMouseEnter={() => setIsOpen(true)}
            className={cn(
              ` absolute translate-y-full bottom-0  rounded-b-xl overflow-hidden  w-max`,
              position == 'left' ? '-translate-x-1/2' : '-translate-x-0'
            )}
          >
            <div className=" p-3 flex flex-col gap-3  bg-popover sm:bg-popover/80 backdrop-blur-lg duration-200 mt-3 ">
              {subHeaders.map((header) => (
                <Link
                  key={header.title}
                  className="hover:bg-black/50 hover:text-white hover:dark:bg-white/15 duration-200 p-2 rounded-xl dark:text-white text-black flex gap-2 items-center"
                  href={header.href}
                >
                  <p>{header.title}</p>
                  {header.icon}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NavigationDropdown
