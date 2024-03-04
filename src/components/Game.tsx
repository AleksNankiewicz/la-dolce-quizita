'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { useGameStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { shuffleArray, sliceArrayByPercentage } from '@/lib/utils'
import GameSummary from './GameSummary'
import { useSession } from 'next-auth/react'
import { questionsProps, sessionUserProps } from '@/types/data'
import { resetStore } from '../lib/store'
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

  const [questions, setQuestions] = useState(quiz.questions)
  const [index, setIndex] = useState<number>(0)

  const initialQuestionsNumber = questions.length

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

  //refs

  const intervalId = useRef<any>(null)
  const timerIntervalId = useRef<any>(null)

  //functions

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

  //Use Effects

  useEffect(() => {
    const init = () => {
      resetStore()
      const shuffledQuestions = questions.map((question: any) => ({
        ...question,
        answears: shuffleArray(question.answears),
      }))

      console.log(quiz.questionsPercent)
      setQuestions(
        sliceArrayByPercentage(
          shuffleArray(shuffledQuestions),
          quiz.questionsPercent
        )
      )
      console.log(questions.length)
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
      // console.log(tampstamp)

      if (tampstamp >= questions[index].time * 100) {
        tampstamp = 0
        nextQuestion()
      }
      timerIntervalId.current = requestAnimationFrame(animate)
    }
    if (index == questions.length) return endGame()

    // intervalId.current = setInterval(() => {
    //   nextQuestion()
    // }, questions[index].time * 1000)

    timerIntervalId.current = requestAnimationFrame(animate)
    // timerIntervalId.current = setInterval(() => {
    //   decrementActualQuestionTime((1 / (questions[index].time * 10)) * 4)
    // }, 1)

    return () => {
      clearInterval(intervalId.current)
      //   clearInterval(timerIntervalId.current)
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

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3 select-none">
      <div className=" text-3xl text-black  col-span-2 w-[40vh]  min-h-[30vh]  rounded-2xl flex justify-center items-center  relative mx-auto">
        {questions[index]?.img && (
          <Image
            src={questions[index]?.img}
            fill
            alt="background"
            className="overflow-hidden rounded-2xl  group-hover:scale-125  duration-300"
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

      {questions[index].answears.map((answear: any, i: number) => (
        <motion.div
          onClick={() => {
            setIsAnimate(true)
            setClickedButton(answear)
          }}
          key={answear.id || answear.title}
          className={`text-2xl text-white  col-span-1 w-full  min-h-[10vh] ${buttonColors[i]} rounded-2xl flex justify-center items-center text-center cursor-pointer text-wrap `}
          animate={
            isAnimate === true && {
              border: ['3px solid white', '3px solid black', '3px solid white'],
            }
          }
          transition={{ repeat: 3, duration: 1 }}
          onAnimationComplete={() => {
            checkAnswear()
          }}
        >
          <p className="w-full h-full p-4 flex justify-center items-center">
            {answear.title}
          </p>
        </motion.div>
      ))}

      {isCorrectAnswear === true && (
        <motion.div
          className="w-5 h-5 bg-green-400 rounded-full absolute lg:hidden"
          initial={{ y: '60vh', x: '10vw' }}
          animate={{ y: '-5vw', x: ['40vw', '78vw'], opacity: [1, 1, 1, 0] }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
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

      {isEndGame && <GameSummary questions={questions} quizSlug={quiz.slug} />}
    </main>
  )
}

export default Game
