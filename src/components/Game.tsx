'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { useGameStore } from '@/lib/store'

const startButtonColors = [
  'bg-orange-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-red-600',
]

const Game = (params: any) => {
  const quiz = params.data
  const { questions } = quiz
  const [index, setIndex] = useState<number>(0)

  const isGameStarted = useGameStore((state) => state.isGameStarted)

  const initialQuestionTime = questions[index]?.time
  const initialQuestionsNumber = questions.length

  const setIsGameStarted = useGameStore((state) => state.setIsGameStarted)

  const toggleGameStart = (isStarted: boolean) => {
    setIsGameStarted(isStarted)
  }
  const setQuestionsNumber = useGameStore((state) => state.setQuestionsNumber)

  const toggleQuestionsNumber = (initialValue: number) => {
    setQuestionsNumber(initialValue)
  }

  const setInitialQuestionTime = useGameStore((state) => state.setQuestionTime)

  const setActualQuestionsNumber = useGameStore(
    (state) => state.setActualQuestionsNumber
  )

  const toggleActualQuestionsNumber = (value: number) => {
    setActualQuestionsNumber(value)
  }

  const setActualQuestionTime = useGameStore(
    (state) => state.decrementActualQuestionTime
  )

  const toggleActualQuestionTime = () => {
    setActualQuestionTime()
  }

  const setGamePoints = useGameStore((state) => state.setGamePoints)
  const toggleGamePoints = (initialValue: number) => {
    setGamePoints(initialValue)
  }

  const init = () => {
    toggleQuestionsNumber(initialQuestionsNumber)
    toggleGameStart(true)
  }

  const [buttonColors, setButtonColors] = useState(startButtonColors)

  const [correctAnswears, setCorrectAnswears] = useState(0)
  const [incorrectAnswears, setIncorrectAnswears] = useState(0)
  const [isTransition, setIsTransition] = useState(false)

  const [isGameRunning, setIsGameRunning] = useState(false)

  const intervalId = useRef<any>(null)
  const timerIntervalId = useRef<any>(null)

  useEffect(() => {
    init()
    setIsGameRunning(true)
  }, [])

  useEffect(() => {
    if (!isGameRunning) return

    if (index == questions.length - 1) return

    setInitialQuestionTime()
    console.log('działa')
    timerIntervalId.current = setInterval(() => {
      toggleActualQuestionTime()
    }, 1)

    intervalId.current = setInterval(() => {
      nextQuestion()
    }, 10000)

    return () => {
      clearInterval(intervalId.current)
      clearInterval(timerIntervalId.current)
    }
  }, [isGameRunning])

  const checkAnswear = (isCorrect: boolean, i: number) => {
    if (!isGameRunning) return
    const newButtonColors = buttonColors.map((button) => 'bg-red-600')

    if (isCorrect) {
      newButtonColors[i] = 'bg-green-600'
    } else {
      const correctIndex = questions[index].answears.findIndex(
        (answear: any) => answear.isCorrect
      )
      newButtonColors[correctIndex] = 'bg-green-600'
    }
    setButtonColors(newButtonColors)
    setIsGameRunning(false)
    clearInterval(intervalId.current)
  }

  const nextQuestion = () => {
    if (index == questions.length - 1) return console.log('koniec gry')
    setIndex((prev) => prev + 1)
    setInitialQuestionTime()
    setIsGameRunning(true)
    setButtonColors(startButtonColors)
    toggleActualQuestionsNumber(index + 2)
  }

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3 ">
      <div className=" text-3xl text-black  col-span-2 w-full  min-h-[250px]  rounded-2xl flex justify-center items-center  relative">
        <Image
          src={questions[index]?.img}
          fill
          alt="background"
          className="overflow-hidden rounded-2xl  group-hover:scale-125  duration-300"
        />
      </div>
      <div className=" text-2xl text-white p4 col-span-2 w-full text-center py-5">
        <p>{questions[index].title}</p>
      </div>
      {!isGameRunning && (
        <Button
          onClick={nextQuestion}
          className="col-span-2 py-10 bg-purple-600 hover:bg-purple-500 text-3xl"
        >
          Dalej
        </Button>
      )}
      {questions[index].answears.map((answear: any, i: number) => (
        <button
          onClick={() => checkAnswear(answear.isCorrect, i)}
          key={i}
          className={` text-2xl text-white p4 col-span-1 w-full  min-h-[200px] ${buttonColors[i]} rounded-2xl flex justify-center items-center text-center`}
        >
          <p>{answear.title}</p>
        </button>
      ))}
    </main>
  )
}

export default Game
