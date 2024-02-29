'use client'
import { getUserByEmail } from '@/lib/actions'
import { sessionUserProps } from '@/types/data'
import { Pen } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditQuizButton = ({
  quizAuthor,
  slug,
  categorySlug,
}: {
  quizAuthor: string
  slug: string
  categorySlug: string
}) => {
  const router = useRouter()
  const session = useSession()
  const [isAdmin, setIsAdmin] = useState(false)

  const fetchUser = async (email: string) => {
    const user = await getUserByEmail(email)

    const isAuthor = user.email == quizAuthor
    console.log(isAuthor)
    const hasPermission = user.permissions.some(
      (perm: any) => perm.categorySlug === categorySlug
    )

    if (hasPermission || isAuthor || user.permissions[0] === 'Any') {
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
    <div
      className="absolute bg-red-500 flex p-1 rounded-bl-xl rounded-tr-xl right-0 text-white cursor-pointer"
      onClick={() => router.push(`/editQuiz/${slug} `)}
    >
      <div className="flex items-center gap-2 text-sm">
        <Pen size={20} /> Edytuj{' '}
      </div>
    </div>
  )
}

export default EditQuizButton
