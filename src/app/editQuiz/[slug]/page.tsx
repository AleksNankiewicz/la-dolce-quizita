import React from 'react'
import Image from 'next/image'
import {
  Award,
  CheckCircle2,
  Coins,
  CoinsIcon,
  Gamepad2,
  XCircle,
} from 'lucide-react'

import { Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getQuizBySlug } from '@/lib/actions'
import Link from 'next/link'
import { questionsProps } from '@/types/data'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import EditQuiz from '@/components/EditQuiz'

const EditQuizPage = async (params: any) => {
  const slug = params.params.slug
  const quiz = await getQuizBySlug(slug)
  // console.log(quiz)
  const { questions } = quiz
  const { answears } = questions

  const quizDuration = {
    time: 0,
    minutes: 0,
    seconds: 0,
  }
  let quizMaxPoints = 0
  questions.forEach((question: questionsProps) => {
    quizDuration.time += question.time

    quizMaxPoints += question.points
  })

  quizDuration.minutes = Math.floor(quizDuration.time / 60)
  quizDuration.seconds = quizDuration.time - quizDuration.minutes * 60

  return <EditQuiz quiz={quiz} />
}

export default EditQuizPage
