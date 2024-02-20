'use client'
import { sessionUserProps } from '@/types/data'
import { Pen } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const EditQuizButton = ({ slug }: { slug: string }) => {
  const session = useSession()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (session.status == 'authenticated') {
      const user = session.data.user as sessionUserProps
      // console.log(user.isAdmin)

      if (user.isAdmin == true) {
        setIsAdmin(true)
      }
    }
  }, [session])

  if (!isAdmin) return
  return (
    <div className="absolute bg-red-500 flex p-1 rounded-bl-xl rounded-tr-xl right-0 -translate-x-full">
      <Link
        href={`/editQuiz/${slug} `}
        className="flex items-center gap-2 text-sm"
      >
        <Pen size={20} /> Edytuj{' '}
      </Link>
    </div>
  )
}

export default EditQuizButton
