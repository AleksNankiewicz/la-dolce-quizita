'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { useGameStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { shuffleArray } from '@/lib/utils'
const startButtonColors = [
  'bg-orange-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-red-600',
]

const Game = (params: any) => {
  //primary
  const quiz = params.data
  let { questions } = quiz
  const [index, setIndex] = useState<number>(0)

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

  const [isCorrectAnswear, setIsCorrectAnswear] = useState(false)

  //refs

  const intervalId = useRef<any>(null)
  const timerIntervalId = useRef<any>(null)

  //functions

  const checkAnswear = (isCorrect: boolean, i: number) => {
    if (!isGameRunning) return
    const newButtonColors: string[] = []

    if (isCorrect) {
      if (questions[index].points) {
        setGamePoints(gamePoints + questions[index].points)
        setIsCorrectAnswear(true)
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

      questions = shuffleArray(questions)
    }
    init()
    setIsGameRunning(true)
  }, [])

  useEffect(() => {
    if (!isGameRunning) return
    if (isAnimate) return

    resetQuestionTime()
    setIsCorrectAnswear(false)

    timerIntervalId.current = setInterval(() => {
      decrementActualQuestionTime()
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
    <main className=" w-full p-4 grid grid-cols-2 gap-3 select-none">
      <div className=" text-3xl text-black  col-span-2 w-[40vh]  min-h-[30vh]  rounded-2xl flex justify-center items-center  relative mx-auto">
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
          className={` text-2xl text-white  col-span-1 w-full  min-h-[10vh] ${buttonColors[i]} rounded-2xl flex justify-center items-center text-center cursor-pointer `}
          animate={
            isAnimate === true && {
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

      {isCorrectAnswear === true && (
        <motion.div
          className="w-5 h-5 bg-green-400 rounded-full absolute "
          initial={{ y: '60vh', x: '10vw' }}
          animate={{ y: '-5vh', x: '78vw', opacity: 0 }}
          transition={{ duration: 0.75 }}
        ></motion.div>
      )}

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
