'use server'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import QuizBlock from '@/components/layouts/QuizBlock'
import { getQuizes } from '@/lib/actions'
import { Plus } from 'lucide-react'
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
          <EditQuizButton slug={quiz.slug} />
        </Link>
      ))}
      <Link
        href={'/editQuiz'}
        className="block text-2xl bg-slate-900 col-span-1 w-full  h-[150px] sm:h-[200px] md:h-[300px] lg:h-[500px]  text-center gap-2 rounded-xl relative group overflow-hidden hover:bg-slate-800 duration-200"
      >
        <div className="flex justify-center items-center w-full h-full">
          <Plus size={34} />
        </div>
      </Link>
    </main>
  )
}

export default QuizesPage
