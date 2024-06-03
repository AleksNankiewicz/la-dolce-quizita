import { QuestionWithAnswers } from '@/types/extended'
import React from 'react'
import { UserAnswer } from './Game'
import Image from 'next/image'
import { Check, CheckCircle2Icon, X, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type AnswerResultProps = {
  question: QuestionWithAnswers
  userAnswer: UserAnswer | undefined
  className?: string
}

const AnswerResult = ({
  question,
  userAnswer,
  className,
}: AnswerResultProps) => {
  return (
    <div
      className={cn(
        'border flex rounded-2xl overflow-hidden min-h-[121px]',
        className
      )}
    >
      {question.img ? (
        <div className="min-w-[35%] relative">
          <Image
            alt={`zdjęcie pytania`}
            className="object-cover"
            src={question.img}
            fill
          />
        </div>
      ) : null}
      <div className="p-3 flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold line-clamp-2">
            {question.title}
          </h1>
          {userAnswer ? (
            userAnswer.isCorrect ? (
              <CheckCircle2Icon className="text-green-500" />
            ) : (
              <XCircle className="text-red-500" />
            )
          ) : (
            <XCircle className="text-red-500" />
          )}
        </div>

        <div className="grid grid-cols-2 text-sm">
          {question.answers.map((answer) => (
            <div key={answer.id} className="flex items-center gap-1">
              <p>{answer.title}</p>{' '}
              {answer.isCorrect ? (
                <Check size={15} className="text-green-400" />
              ) : (
                <X size={15} className="text-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnswerResult
