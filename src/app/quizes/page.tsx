'use server'
import SmallQuizBlock from '@/components/blocks/SmallQuizBlock'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import { AddQuizButton } from '@/components/layouts/addQuizButton'
import QuizesPage from '@/components/pages/QuizesPage'

import { getQuizes } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = async () => {
  const quizesData = await getQuizes() // Assuming getQuizes() returns an array of quiz objects

  return <QuizesPage quizes={quizesData} />
}

export default Page
