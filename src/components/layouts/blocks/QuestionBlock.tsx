import { daysAgo } from '@/lib/utils'
import { ExtendedQuiz } from '@/types/extended'
import { Question, Quiz } from '@prisma/client'
import { User, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const QuestionBlock = ({
  question,
  index,
}: {
  question: Question
  index: number
}) => {
  return (
    <div className="border flex rounded-2xl overflow-hidden min-h-[121px]">
      {question.img ? (
        <div className="min-w-[35%] relative">
          <Image
            alt={`zdjęcie quizu`}
            className="object-cover"
            src={question.img}
            fill
          />
        </div>
      ) : null}
      <div className="p-3 flex flex-col gap-3 w-full">
        <h1 className="text-xl font-semibold line-clamp-1">
          <span>{index} - </span>
          {question.type}
        </h1>
        <p>{question.title}</p>
      </div>
    </div>
  )
}

export default QuestionBlock
