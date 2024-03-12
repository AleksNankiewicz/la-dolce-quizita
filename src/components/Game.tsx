'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { useGameStore } from '@/lib/store'
import { motion } from 'framer-motion'
import {
  divideLastSyllableInSentence,
  shuffleArray,
  sliceArrayByPercentage,
} from '@/lib/utils'
import GameSummary from './GameSummary'
import { useSession } from 'next-auth/react'
import { answearProps, questionsProps, sessionUserProps } from '@/types/data'
import { resetStore } from '../lib/store'
import MultipleChoice from './game/MultipleChoice'
import Sortable from './game/Sortable'
const startButtonColors = [
  'bg-orange-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-red-600',
  'bg-yellow-600',
  'bg-brown-600',
  'bg-purple-600',
]

const Game = (params: any) => {
  //primary
  const quiz = params.data

  const [questions, setQuestions] = useState<questionsProps[]>(quiz.questions)
  const [index, setIndex] = useState<number>(0)

  //user

  //Game store

  const setIsGameStarted = useGameStore((state) => state.setIsGameStarted)

  const setQuestionsNumber = useGameStore((state) => state.setQuestionsNumber)

  const resetQuestionTime = useGameStore((state) => state.resetQuestionTime)

  const setActualQuestionsNumber = useGameStore(
    (state) => state.setActualQuestionsNumber
  )

  const setGamePoints = useGameStore((state) => state.setGamePoints)

  const gamePoints = useGameStore((state) => state.gamePoints)

  const decrementActualQuestionTime = useGameStore(
    (state) => state.decrementActualQuestionTime
  )

  //Use state

  const [buttonColors, setButtonColors] = useState(startButtonColors)

  const [isAnimate, setIsAnimate] = useState(false)

  const [isGameRunning, setIsGameRunning] = useState(false)

  const [isCorrectAnswear, setIsCorrectAnswear] = useState(false)

  const [isEndGame, setIsEndGame] = useState(false)

  const [clickedButton, setClickedButton] = useState<any>()
  const [shuffledSortableAnswears, setShuffledSortableAnswears] = useState<
    answearProps[]
  >([])

  //refs

  const intervalId = useRef<any>(null)
  const timerIntervalId = useRef<any>(null)

  const nextButtonRef = useRef<HTMLButtonElement>(null)

  //functions

  const checkSortableAnswear = () => {
    if (!isGameRunning) return
    resetQuestionTime()
    clearInterval(intervalId.current)
    clearInterval(timerIntervalId.current)
    setIsGameRunning(false)
    const isOrderSame = questions[index].answears.every((answer, index) => {
      return answer.title === shuffledSortableAnswears[index].title
    })

    if (isOrderSame) {
      setGamePoints(gamePoints + questions[index].points)
      setIsCorrectAnswear(true)
      questions[index].correctAnswear = true
    }

    //To do
    console.log('Is order same:', isOrderSame)
  }

  const checkAnswear = () => {
    if (!isGameRunning) return
    resetQuestionTime()
    clearInterval(intervalId.current)
    clearInterval(timerIntervalId.current)
    const newButtonColors: string[] = []

    if (clickedButton.isCorrect) {
      if (questions[index].points) {
        setGamePoints(gamePoints + questions[index].points)
        setIsCorrectAnswear(true)
        questions[index].correctAnswear = true
      }
    }

    questions[index].answears.forEach((answear: any, i: number) => {
      if (answear.isCorrect) {
        newButtonColors[i] = 'bg-green-600'
      } else {
        newButtonColors[i] = 'bg-red-600'
      }
    })
    setIsGameRunning(false)

    setButtonColors(newButtonColors)
    setClickedButton('')
  }

  const nextQuestion = () => {
    clearInterval(intervalId.current)
    clearInterval(timerIntervalId.current)
    resetQuestionTime()
    handleScrollToTop()

    if (isEndGame) return
    if (index == questions.length - 1) return endGame()

    setTimeout(() => {
      setIsGameRunning(true)
      setIndex((prev) => prev + 1)
      setButtonColors(startButtonColors)
      setActualQuestionsNumber(index + 2)
      setIsAnimate(false)
    }, 450)
  }

  const endGame = () => {
    setIsGameStarted(false)
    setIsGameRunning(false)
    setIsEndGame(true)

    clearInterval(intervalId.current)
    clearInterval(timerIntervalId.current)
  }

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  }
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top of the document
      behavior: 'smooth',
    })
  }

  //Use Effects

  useEffect(() => {
    const isSmallScreen = window.innerWidth < 768 // Define the threshold for small screens

    if (isSmallScreen && nextButtonRef.current) {
      nextButtonRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isGameRunning])

  useEffect(() => {
    const init = () => {
      resetStore()
      handleScrollToTop()
      const shuffledQuestions = questions.map((question: questionsProps) => {
        if (question.type == 'multiple-choice' || !question.type) {
          console.log('multi')
          return {
            ...question,
            answears: shuffleArray(question.answears),
          }
        }

        if (question.type == 'sortable') {
          return {
            ...question,
          }
        }

        if (question.type == 'open-ended') return
      })

      setQuestions(
        sliceArrayByPercentage(
          shuffleArray(shuffledQuestions),
          quiz.questionsPercent
        )
      )

      setQuestionsNumber(questions.length)
      setIsGameStarted(true)
    }
    init()
    setIsGameRunning(true)
  }, [])

  useEffect(() => {
    setQuestionsNumber(questions.length)
  }, [questions])

  useEffect(() => {
    if (!isGameRunning || isAnimate || isEndGame) return

    resetQuestionTime()
    setIsCorrectAnswear(false)
    let tampstamp = 0

    const animate = () => {
      decrementActualQuestionTime(1 / questions[index].time)
      tampstamp++

      if (tampstamp >= questions[index].time * 100) {
        tampstamp = 0
        nextQuestion()
      }
      timerIntervalId.current = requestAnimationFrame(animate)
    }
    if (index == questions.length) return endGame()

    //Tym wyłaczasz czas
    //timerIntervalId.current = requestAnimationFrame(animate)

    return () => {
      clearInterval(intervalId.current)

      cancelAnimationFrame(timerIntervalId.current)
    }
  }, [
    isGameRunning,
    nextQuestion,
    questions.length,
    resetQuestionTime,
    isAnimate,
    index,
  ])

  useEffect(() => {
    if (questions[index].type == 'sortable') {
      const copyArr = [...questions[index].answears]
      setShuffledSortableAnswears(shuffleArray(copyArr) as answearProps[])
    }
  }, [questions, index])

  console.log(questions[index].answears)

  return (
    <main
      className={` w-full p-4 grid grid-cols-2 gap-3 select-none ${
        isEndGame && 'overflow-y-hidden'
      }`}
    >
      <div className=" text-3xl text-black  col-span-2 w-[40vh]  min-h-[30vh]  rounded-2xl flex justify-center items-center  relative mx-auto">
        {questions[index]?.img && (
          <Image
            src={questions[index]?.img}
            fill
            alt="background"
            className="overflow-hidden rounded-2xl  group-hover:scale-125  duration-300 object-contain"
          />
        )}
      </div>
      <div
        className={` text-2xl text-white p4 col-span-2 w-full text-center py-5  ${
          !questions[index]?.img && '-mt-36 mb-24'
        }`}
      >
        <p>{questions[index].title}</p>
      </div>

      {questions[index].type == 'multiple-choice' || !questions[index].type ? (
        <MultipleChoice
          answears={questions[index]?.answears || []}
          setIsAnimate={setIsAnimate}
          setClickedButton={setClickedButton}
          isAnimate={isAnimate}
          checkAnswear={checkAnswear}
          isCorrectAnswear={isCorrectAnswear}
          isGameRunning={isGameRunning}
          nextButtonRef={nextButtonRef}
          nextQuestion={nextQuestion}
          buttonColors={buttonColors}
        />
      ) : null}

      {questions[index].type == 'sortable' ? (
        <Sortable
          answears={shuffledSortableAnswears || []}
          setAnswears={setShuffledSortableAnswears}
          setIsAnimate={setIsAnimate}
          setClickedButton={setClickedButton}
          isAnimate={isAnimate}
          checkSortableAnswear={checkSortableAnswear}
          isCorrectAnswear={isCorrectAnswear}
          isGameRunning={isGameRunning}
          nextButtonRef={nextButtonRef}
          nextQuestion={nextQuestion}
          buttonColors={buttonColors}
        />
      ) : null}

      {isEndGame && <GameSummary questions={questions} quizSlug={quiz.slug} />}
    </main>
  )
}

export default Game
