'use client'
import { getUserByEmail } from '@/lib/actions'
import { sessionUserProps } from '@/types/data'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const AddQuizButton = ({ isWide }: { isWide: boolean }) => {
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
        href={'/editQuiz/newQuiz'}
        className={`block text-2xl bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 col-span-1 h-[180px] sm:h-[240px] md:h-[200px] lg:h-[280px] ${
          isWide &&
          'col-span-2 md:col-span-4 h-[60px] sm:h-[60px] md:h-[60px] lg:h-[60px]'
        }    w-full   text-center gap-2 rounded-xl relative group overflow-hidden hover:from-gray-800 hover:via-slate-800 hover:to-gray-700  duration-200 transition-colors`}
      >
        <div className="flex justify-center items-center w-full h-full">
          <Plus size={34} />
        </div>
      </Link>
    )
  )
}
