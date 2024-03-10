'use server'
import SmallQuizBlock from '@/components/blocks/SmallQuizBlock'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import { AddQuizButton } from '@/components/layouts/addQuizButton'

import { getQuizes } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const QuizesPage = async () => {
  const quizesData = await getQuizes() // Assuming getQuizes() returns an array of quiz objects

  return (
    <main className=" w-full p-4 grid grid-cols-2 md:grid-cols-4  gap-3 ">
      {quizesData.map((quiz) => (
        <SmallQuizBlock
          slug={quiz.slug}
          img={quiz.img}
          title={quiz.title}
          categorySlug={quiz.categorySlug}
          author={quiz.author}
          key={quiz._id || quiz.slug}
        />
      ))}
      <AddQuizButton isWide={false} />
    </main>
  )
}

export default QuizesPage
