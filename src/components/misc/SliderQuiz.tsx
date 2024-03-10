'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import EditQuizButton from '../layouts/EditQuizButton'
import Link from 'next/link'
import { CheckCircle, CheckCircle2, UserRound } from 'lucide-react'
import { formatNumber, sliceArrayByPercentage } from '@/lib/utils'
import { QuizesPlayedProps, questionsProps, quizProps } from '@/types/data'

const SliderQuiz = ({
  quiz,
  email,
}: {
  quiz: quizProps
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

  useEffect(() => {
    const userQuiz = quiz.records?.find((record) => record.email == email)

    if (userQuiz) {
      setUserScore(userQuiz.score)
    }
  }, [userScore, email])

  return (
    <div className="relative w-[200px] md:w-[250px]  mx-2 h-[180px] sm:h-[240px] md:h-[200px] lg:h-[280px] flex justify-center items-center">
      <Link
        href={`/quizes/${quiz.slug}`}
        className={`block text-2xl text-white p4 col-span-1 w-full h-full   text-center gap-2 rounded-xl relative group overflow-hidden flex-col${
          !quiz.img && 'bg-slate-800'
        }`}
      >
        <div className="w-[full] h-2/3 relative">
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
          <div className="absolute right-2 bottom-2 text-xs bg-slate-900 flex items-center gap-1 rounded-xl px-1">
            <UserRound size={12} strokeWidth={2} />{' '}
            {formatNumber(quiz.playCount)}
          </div>

          {email && (
            <div className="absolute right-2 top-2 text-xs bg-slate-900 flex items-center gap-1 rounded-xl px-1">
              {userScore ? (
                userScore < quizMaxPoints ? (
                  <p>{((userScore / quizMaxPoints) * 100).toFixed()}%</p>
                ) : (
                  <CheckCircle2 size={20} className="my-1" />
                )
              ) : (
                <p>Nowy</p>
              )}
            </div>
          )}
        </div>

        {quiz.title && (
          <p
            className={`absolute h-[34%] w-full 
            bottom-0 left-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex justify-start items-center px-2 text-base text-left`}
          >
            {quiz.title}
          </p>
        )}
      </Link>
      {/* <EditQuizButton
           slug={slug}
           categorySlug={categorySlug}
           quizAuthor={author}
         /> */}
    </div>
  )
}

export default SliderQuiz
