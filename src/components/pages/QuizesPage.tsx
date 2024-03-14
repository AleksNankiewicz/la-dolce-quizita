'use client'
import { getUserByEmail } from '@/lib/actions'
import { UserProps, quizProps, sessionUserProps } from '@/types/data'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import SmallQuizBlock from '../blocks/SmallQuizBlock'
import { AddQuizButton } from '../layouts/addQuizButton'

const QuizesPage = ({ quizes }: { quizes: quizProps[] }) => {
  const session = useSession()
  const [email, setEmail] = useState<string | undefined>()

  const fetchUser = async (email: string) => {
    const user: UserProps = await getUserByEmail(email)
    setEmail(user.email)
  }

  useEffect(() => {
    if (session.status == 'authenticated') {
      const user = session.data.user as sessionUserProps
      fetchUser(user.email)
    }
    // setLoading(false)
  }, [session])
  return (
    <main className=" w-full p-4 grid grid-cols-2 md:grid-cols-4  gap-3 ">
      {quizes.map((quiz) => (
        <SmallQuizBlock quiz={quiz} email={email} key={quiz._id} />
      ))}
      {/* <AddQuizButton isWide={false} /> */}
    </main>
  )
}

export default QuizesPage
