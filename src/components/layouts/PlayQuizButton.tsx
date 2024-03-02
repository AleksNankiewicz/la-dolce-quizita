'use client'
import { getUserByEmail } from '@/lib/actions'
import { sessionUserProps } from '@/types/data'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ThreeDots } from 'react-loader-spinner'

const PlayQuizButton = ({ slug, access }: { slug: string; access: string }) => {
  const [isUserLogged, setIsUserLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userQuizPlayed, setUserQuizPlayed] = useState<string[]>([])
  const session = useSession()

  const fetchUser = async (email: string) => {
    const user = await getUserByEmail(email)
    setIsUserLogged(true)
    setUserQuizPlayed(user.quizesPlayed)
    setIsLoading(false)
  }

  useEffect(() => {
    if (session.status == 'authenticated') {
      const user = session.data.user as sessionUserProps
      fetchUser(user.email)
      console.log('hallo')
    } else setIsLoading(false)
  }, [session])

  const renderButtonContent = () => {
    if (isLoading) {
      return (
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )
    }

    if (!isUserLogged && access === 'Logged') {
      return 'Tylko zalogowani użytkownicy mogą zagrać w ten quiz'
    }

    if (access === 'Competetive' && userQuizPlayed.includes(slug)) {
      return 'Nie możesz rozegrać ponownie tego konkursu'
    }
    if (!isUserLogged && access === 'Competetive') {
      return 'Musisz być zalogowany by rozegrać quiz konkursowy'
    }

    return 'Graj'
  }

  const renderButtonClassName = () => {
    let classNames = 'w-full bg-purple-600 hover:bg-purple-500 text-2xl py-8'

    if (!isUserLogged && access === 'Logged') {
      classNames += ' pointer-events-none text-sm'
    }

    if (!isUserLogged && access === 'Competetive') {
      classNames += ' pointer-events-none text-sm'
    }
    if (access === 'Competetive' && userQuizPlayed.includes(slug)) {
      classNames += ' pointer-events-none text-sm'
    }

    return classNames
  }

  return (
    <Link
      href={`/game/${slug}`}
      passHref
      className={`w-full block col-span-2 ${
        (!isUserLogged && access === 'Logged') ||
        (access === 'Competetive' && userQuizPlayed.includes(slug)) ||
        (!isUserLogged && access === 'Competetive')
          ? 'pointer-events-none'
          : ''
      }`}
    >
      <Button className={renderButtonClassName()}>
        {renderButtonContent()}
      </Button>
    </Link>
  )
}

export default PlayQuizButton
