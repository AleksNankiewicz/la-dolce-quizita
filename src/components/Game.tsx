'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { useGameStore } from '@/lib/store'
import { motion } from 'framer-motion'
const startButtonColors = [
  'bg-orange-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-red-600',
]

const Game = (params: any) => {
  //primary
  const quiz = params.data
  const { questions } = quiz
  const [index, setIndex] = useState<number>(0)

  const initialQuestionTime = questions[index]?.time
  const initialQuestionsNumber = questions.length

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

  //refs

  const intervalId = useRef<any>(null)
  const timerIntervalId = useRef<any>(null)

  //functions

  const checkAnswear = (isCorrect: boolean, i: number) => {
    if (!isGameRunning) return
    const newButtonColors = buttonColors.map((button) => 'bg-red-600')

    //console.log(isCorrect)
    if (isCorrect) {
      newButtonColors[i] = 'bg-green-600'
      console.log(gamePoints)
      if (questions[index].points) {
        setGamePoints(gamePoints + questions[index].points)
      }
    } else {
      const correctIndex = questions[index].answears.findIndex(
        (answear: any) => answear.isCorrect
      )
      newButtonColors[correctIndex] = 'bg-green-600'
    }
    setIsGameRunning(false)
    setButtonColors(newButtonColors)
    clearInterval(intervalId.current)
    clearInterval(timerIntervalId.current)
  }

  const nextQuestion = () => {
    if (index == questions.length - 1) return console.log('koniec gry')
    setIndex((prev) => prev + 1)
    resetQuestionTime()
    setIsGameRunning(true)
    setButtonColors(startButtonColors)
    setActualQuestionsNumber(index + 2)
    setIsAnimate(false)
  }

  //Use Effects

  useEffect(() => {
    const init = () => {
      setQuestionsNumber(initialQuestionsNumber)
      setIsGameStarted(true)
    }
    init()
    setIsGameRunning(true)
  }, [])

  useEffect(() => {
    if (!isGameRunning) return
    if (isAnimate) return

    resetQuestionTime()

    timerIntervalId.current = setInterval(() => {
      decrementActualQuestionTime()
      console.log('a')
    }, 1)
    if (index == questions.length - 1) return

    intervalId.current = setInterval(() => {
      nextQuestion()
    }, 10000)

    return () => {
      clearInterval(intervalId.current)
      clearInterval(timerIntervalId.current)
    }
  }, [
    isGameRunning,
    nextQuestion,
    questions.length,
    resetQuestionTime,
    isAnimate,
    index,
  ])

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3 ">
      <div className=" text-3xl text-black  col-span-2 w-2/3 md:w-2/5  min-h-[150px]  rounded-2xl flex justify-center items-center  relative mx-auto">
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

      {questions[index].answears.map((answear: any, i: number) => (
        <motion.div
          onClick={() => {
            setIsAnimate(true)
          }}
          key={answear.title}
          className={` text-2xl text-white p4 col-span-1 w-full  min-h-[100px] ${buttonColors[i]} rounded-2xl flex justify-center items-center text-center cursor-pointer `}
          animate={
            isAnimate === true && {
              // backgroundColor: ['#0f172a'],
              border: ['3px solid white', '3px solid black', '3px solid white'],
            }
          }
          transition={{ repeat: 3, duration: 1 }}
          onAnimationComplete={() => {
            checkAnswear(answear.isCorrect, i)
          }}
        >
          <p>{answear.title}</p>
        </motion.div>
      ))}
      {!isGameRunning && (
        <Button
          onClick={nextQuestion}
          className="col-span-2 py-10 bg-purple-600 hover:bg-purple-500 text-3xl"
        >
          Dalej
        </Button>
      )}
    </main>
  )
}

export default Game
