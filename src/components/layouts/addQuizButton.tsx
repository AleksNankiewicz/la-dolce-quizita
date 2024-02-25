'use client'
import { sessionUserProps } from '@/types/data'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const AddQuizButton = () => {
  const session = useSession()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (session.status === 'authenticated') {
      const user = session.data.user as sessionUserProps

      if (user.isAdmin) {
        setIsAdmin(true)
      }

      console.log(isAdmin)
    }
  }, [session?.data, session?.status])

  return (
    isAdmin && (
      <Link
        href={'/editQuiz'}
        className="block text-2xl bg-slate-900 col-span-1 w-full  h-[200px] sm:h-[240px] md:h-[200px] lg:h-[280px]  text-center gap-2 rounded-xl relative group overflow-hidden hover:bg-slate-800 duration-200 "
      >
        <div className="flex justify-center items-center w-full h-full">
          <Plus size={34} />
        </div>
      </Link>
    )
  )
}
