import React from 'react'
import Image from 'next/image'

import { getQuizBySlug } from '@/lib/actions'

import { questionsProps } from '@/types/data'

import EditQuiz from '@/components/EditQuiz'

const EditQuizPage = async (params: any) => {
  const slug = params.params.slug
  const quiz = await getQuizBySlug(slug)

  const { questions } = quiz

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

  console.log(JSON.parse(JSON.stringify(quiz)))

  return <EditQuiz quiz={JSON.parse(JSON.stringify(quiz))} />
}

export default EditQuizPage
