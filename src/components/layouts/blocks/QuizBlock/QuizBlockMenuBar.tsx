'use client'
import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { CircleEllipsisIcon } from 'lucide-react'
import Link from 'next/link'

type QuizBlockMenuBarProps = {
  id: string
  slug: string
}
const QuizBlockMenuBar = ({ id, slug }: QuizBlockMenuBarProps) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <CircleEllipsisIcon />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href={`/editQuiz/${slug}`}>Edytuj</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="text-red-400"> Usuń</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default QuizBlockMenuBar
