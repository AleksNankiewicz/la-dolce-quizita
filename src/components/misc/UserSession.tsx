'use client'
import StatsBlock from '@/components/layouts/StatsBlock'
import FindUser from '@/components/misc/FindUser'
import { Button } from '@/components/ui/button'
import { sessionUserProps } from '@/types/data'
import { Pen } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input } from 'postcss'
import React, { ChangeEvent, useEffect, useState } from 'react'

const UserSession = () => {
  const session = useSession()
  const router = useRouter()

  const [isUserLogged, setIsUserLogged] = useState(false)
  const [email, setUsername] = useState('')
  useEffect(() => {
    if (session.status == 'authenticated') {
      setIsUserLogged(true)
      const user = session.data.user as sessionUserProps

      setUsername(user.email)
    } else if (session.status == 'unauthenticated') {
      router.push('/')
    }
  }, [session?.data, session?.status])

  return <FindUser email={email} />
}

export default UserSession
