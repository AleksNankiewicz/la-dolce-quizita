'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { CheckCircle, CheckCircle2, UserRound } from 'lucide-react'
import { formatNumber, sliceArrayByPercentage } from '@/lib/utils'
import { QuizesPlayedProps, questionsProps, quizProps } from '@/types/data'
import 'keen-slider/keen-slider.min.css'
import { QuizWithQuestions } from '@/types/extended'
const SliderQuiz = ({
  quiz,
  email,
}: {
  quiz: QuizWithQuestions
  email: string | undefined
}) => {
  const [userScore, setUserScore] = useState<number>()

  let quizMaxPoints = 0
  const slicedArr = sliceArrayByPercentage(
    quiz.questions,
    quiz.questionsPercent
  )
  slicedArr.forEach((question: questionsProps) => {
    quizMaxPoints += question.points
  })

  return (
    <div className="keen-slider__slide  relative  h-[270px]  rounded-xl flex border my-3  shadow-[0px_6px_0px_0px_#666] shadow-gray-100 dark:shadow-slate-800">
      <Link
        href={`/quizes/${quiz.slug}`}
        className={`block text-2xl  col-span-1 w-full h-full   text-center gap-2 rounded-xl relative group overflow-hidden flex-col${
          !quiz.img && 'bg-slate-800'
        }`}
      >
        <div className="w-[full] h-3/5 relative">
          {quiz.img && (
            <Image
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              blurDataURL={typeof quiz.img == 'string' ? quiz.img : ''}
              placeholder="blur"
              src={typeof quiz.img == 'string' ? quiz.img : ''}
              fill
              alt={quiz.title}
              className="   group-hover:scale-125  duration-300 object-cover overflow-hidden"
            />
          )}
          <div className="absolute right-3 bottom-3 bg-primary p-2 flex gap-2 items-center text-xs rounded-md">
            <p>{quiz.questions.length} Pyt</p>
          </div>
        </div>

        {quiz.title && (
          <div
            className={`absolute h-2/5 w-full 
            bottom-0 left-0 dark:bg-slate-900  p-4 `}
          >
            <p className="text-xl font-medium text-left line-clamp-2">
              {quiz.title}
            </p>
          </div>
        )}
      </Link>
    </div>
  )
}

export default SliderQuiz
