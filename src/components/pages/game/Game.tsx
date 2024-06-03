'use client'
import { ExtendedQuiz } from '@/types/extended'
import React, { useState, useEffect } from 'react'
import GameNavbar from './GameNavbar'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { answerButtonColors } from '@/lib/constants/answerButtonColors'
import BottomNavbar from '@/components/layouts/BottomNavbar'
import GameTimeProgress from './GameTimeProgress'
import GameAnswerResult from './GameAnswerResult'
import EndGameModal from './EndGameModal'

type GameProps = {
  quiz: ExtendedQuiz
}

export type UserAnswer = {
  questionId: string
  answerId: string
  isCorrect: boolean
}

const Game = ({ quiz }: GameProps) => {
  const [index, setIndex] = useState(0)

  const [isGameRunning, setIsGameRunning] = useState(true)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isIncorrect, setIsIncorrect] = useState(false)
  const [isTimeout, setIsTimeout] = useState(false)
  const [isEndGame, setIsEndGame] = useState(false)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const handleNextQuestion = () => {
    setIndex((prevIndex) => {
      let nextIndex = prevIndex + 1
      if (nextIndex >= quiz.questions.length) {
        setIsEndGame(true)
        nextIndex = prevIndex
      } else {
        setIsGameRunning(true)
        setIsCorrect(false)
        setIsIncorrect(false)
        setIsTimeout(false)
      }
      return nextIndex
    })
  }

  const checkAnswer = (answerId: string, isCorrectAnswer: boolean) => {
    setIsGameRunning(false)
    if (isCorrectAnswer) {
      setIsCorrect(true)
    } else {
      setIsIncorrect(true)
    }
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: quiz.questions[index].id,
        answerId: answerId,
        isCorrect: isCorrectAnswer,
      },
    ])
  }

  return (
    <>
      <GameNavbar
        hideAnswerType={isCorrect || isIncorrect || isTimeout}
        currentQuestion={index + 1}
        totalQuestions={quiz.questions.length}
      />

      <GameTimeProgress
        setIsTimeout={setIsTimeout}
        timeToAnswer={quiz.questions[index].time}
        isGameRunning={isGameRunning}
        setIsGameRunning={setIsGameRunning}
      />

      {isCorrect || isIncorrect || isTimeout ? (
        <GameAnswerResult
          isCorrect={isCorrect}
          isIncorrect={isIncorrect}
          isTimeout={isTimeout}
        />
      ) : null}

      <div
        className={cn('flex flex-col pt-10', !isGameRunning && 'pb-[120px]')}
      >
        {quiz.questions[index].img && (
          <div className="text-black text-2xl col-span-2 text-center min-h-[225px] rounded-xl relative overflow-hidden flex justify-center w-full mx-auto h-full">
            <Image
              src={quiz.questions[index].img}
              fill
              alt="background"
              className="overflow-hidden rounded-2xl duration-300 object-cover"
            />
          </div>
        )}
        {quiz.questions[index].title && (
          <h1 className="text-2xl font-semibold text-center w-full border-b py-8">
            {quiz.questions[index].title}
          </h1>
        )}
        {quiz.questions[index].answers && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:justify-center">
            {quiz.questions[index].answers.map((answer, i) => (
              <Button
                variant={'game'}
                onClick={() => checkAnswer(answer.id, answer.isCorrect)}
                key={answer.id}
                className={cn(
                  (isCorrect || isIncorrect || isTimeout) &&
                    (answer.isCorrect
                      ? 'bg-green-500 shadow-green-600'
                      : 'bg-red-500 shadow-red-600'),
                  !(isCorrect || isIncorrect || isTimeout) &&
                    `${answerButtonColors[i].background} ${answerButtonColors[i].shadow}`
                )}
              >
                {answer.title}
              </Button>
            ))}
          </div>
        )}
      </div>
      {!isGameRunning && !isEndGame ? (
        <BottomNavbar>
          <Button size={'xl'} onClick={handleNextQuestion}>
            Dalej
          </Button>
        </BottomNavbar>
      ) : null}
      {isEndGame && (
        <EndGameModal
          questions={quiz.questions}
          quizSlug={quiz.slug}
          userAnswers={userAnswers}
        />
      )}
    </>
  )
}

export default Game
