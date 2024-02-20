'use server'
import QuizBlock from '@/components/layouts/QuizBlock'
import { getQuizes } from '@/lib/actions'
import Image from 'next/image'

import Link from 'next/link'
import React from 'react'

const QuizesPage = async () => {
  const quizesData = await getQuizes() // Assuming getQuizes() returns an array of quiz objects

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3">
      {quizesData.map((quiz) => (
        <Link
          key={quiz.label}
          href={`/quizes/${quiz.slug}`}
          className="block text-2xl text-white p4 col-span-1 w-full  h-[150px] sm:h-[200px] md:h-[300px] lg:h-[500px]  text-center gap-2 rounded-xl relative group overflow-hidden"
        >
          {' '}
          <Image
            src={quiz.img}
            fill
            alt={quiz.title}
            className=" rounded-2xl opacity-40 group-hover:scale-125  duration-300"
          />
          <p className="absolute  w-full h-full top-1/2 -translate-y-[15%]  text-white">
            {quiz.title}
          </p>
        </Link>
      ))}
    </main>
  )
}

export default QuizesPage
