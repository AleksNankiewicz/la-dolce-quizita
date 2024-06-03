import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BadgeCheck } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { UserAnswer } from './Game'
import { QuestionWithAnswers } from '@/types/extended'
import AnswerResult from './AnswerResult'
import { useRouter } from 'next/navigation'

type EndGameModalProps = {
  userAnswers: UserAnswer[]
  questions: QuestionWithAnswers[]
  quizSlug: string
}

const EndGameModal = ({
  userAnswers,
  questions,
  quizSlug,
}: EndGameModalProps) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  const { correctAnswersCount, incorrectAnswersCount } = questions.reduce(
    (counts, question) => {
      const userAnswer = userAnswers.find(
        (answer) => answer.questionId === question.id
      )
      if (userAnswer) {
        if (userAnswer.isCorrect) {
          counts.correctAnswersCount += 1
        } else {
          counts.incorrectAnswersCount += 1
        }
      } else {
        counts.incorrectAnswersCount += 1 // Consider unanswered questions as incorrect
      }
      return counts
    },
    { correctAnswersCount: 0, incorrectAnswersCount: 0 }
  )
  return (
    <Dialog open>
      <DialogContent className="w-[90%] rounded-3xl p-0 md:p-6">
        <DialogHeader className="p-6 md:p-0">
          <DialogTitle className="text-3xl  flex flex-col items-center gap-4">
            <BadgeCheck size={50} />
            <p>Gratulacje</p>
            <DialogDescription>
              Ukończyłeś pomyślnie ten quiz odpowiadając poprawnie na{' '}
              {correctAnswersCount} z {questions.length} pytań!
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4  pl-2 md:px-0">
          <h1 className="text-lg font-semibold">Twoje odpowiedzi</h1>
          <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
            {questions.map((question, index) => {
              const userAnswer = userAnswers.find(
                (answer) => answer.questionId === question.id
              )
              return (
                <AnswerResult
                  key={index}
                  question={question}
                  userAnswer={userAnswer}
                  className="mr-2 md:mr-0"
                />
              )
            })}
          </div>
        </div>
        <DialogFooter className="gap-5 p-6 md:p-0">
          <Button onClick={() => router.back()} className="w-full rounded-full">
            Wróc do Menu
          </Button>
          <Button
            onClick={() => window.location.reload()}
            variant={'secondary'}
            className="w-full rounded-full"
          >
            Spróbuj ponownie
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EndGameModal
