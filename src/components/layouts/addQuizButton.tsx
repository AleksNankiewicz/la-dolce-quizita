'use client'
import { getUserByEmail } from '@/lib/actions'
import { sessionUserProps } from '@/types/data'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const AddQuizButton = () => {
  const session = useSession()
  const [isAdmin, setIsAdmin] = useState(false)

  const fetchUser = async (email: string) => {
    const user = await getUserByEmail(email)

    const hasPermission = user.permissions

    if (hasPermission || user.permissions[0] === 'Any') {
      setIsAdmin(true)
    }
  }

  useEffect(() => {
    if (session.status == 'authenticated') {
      const user = session.data.user as sessionUserProps
      fetchUser(user.email)
    }
  }, [session])

  if (!isAdmin) return

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
