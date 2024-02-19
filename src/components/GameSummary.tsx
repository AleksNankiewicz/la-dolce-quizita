'use client'

import { getUserByEmail, updateUserAfterGame } from '@/lib/actions'
import { questionsProps, sessionUserProps } from '@/types/data'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { title } from 'process'
import { useEffect, useState } from 'react'
// import { useGameStore } from '@/lib/store'
// import React, { useEffect } from 'react'

const GameSummary = ({
  questions,
  userEmail,
}: {
  questions: questionsProps[]
  userEmail: string
}) => {
  let correctAnswearsNumber = 0
  const scoredPoints = questions.reduce((acc, question) => {
    if (question.correctAnswear) {
      acc += question.points
      correctAnswearsNumber++
    }
    return acc
  }, 0)
  const allQuestionsNumber = questions.length

  const allCorrect = correctAnswearsNumber == allQuestionsNumber

  const [email, setEmail] = useState('')
  const [emailSet, setEmailSet] = useState(false)
  const session = useSession()

  useEffect(() => {
    if (!emailSet && session.status === 'authenticated') {
      const user = session.data?.user as sessionUserProps
      setEmail(user.email ?? '')
      setEmailSet(true)
    }
  }, [session, emailSet])

  useEffect(() => {
    if (email) {
      const update = async () => {
        await updateUserAfterGame(email, scoredPoints, allCorrect)
      }
      update()
    }
  }, [email])

  // console.log(scoredPoints)

  return (
    <main className=" w-full h-screen p-4 grid grid-cols-2 gap-3 select-none fixed bg-black/95 left-0 top-0 overflow-scroll  py-16">
      <div className="col-span-2 w-full flex  items-center flex-col gap-2 text-center">
        <h1 className="text-3xl text-green-400">Gratulacje</h1>
        <div className="">
          Zdobyłeś{' '}
          <span className="text-green-400 text-xl">{scoredPoints} </span>
          punktów!
        </div>
        <div className="h-0.5 w-full bg-white rounded-full"></div>
        <div className="w-8/12 ">
          Odpowiedziałeś poprawnie na{' '}
          <span className="text-green-400 text-xl">
            {correctAnswearsNumber}{' '}
          </span>{' '}
          z {allQuestionsNumber} pytań
        </div>
        <div className="">Poniżej znajdziesz swoje odpowiedzi</div>
      </div>
      {questions.map((question) => (
        <div
          key={question.title}
          className={`w-full bg-slate-950 col-span-2  p-4 flex justify-evenly items-center text-center flex-col rounded-xl gap-3 border-2 ${
            question.correctAnswear ? 'border-green-400' : 'border-red-600'
          }`}
        >
          {question.correctAnswear ? (
            <p className="text-green-400 text-xl flex flex-col">
              <CheckCircle2 />
            </p>
          ) : (
            <p className="text-red-600 text-xl flex flex-col">
              <XCircle />
            </p>
          )}

          <p className="text-xl">{question.title}</p>
          <div className=" flex flex-wrap gap-3 justify-center">
            {question.answears.map((answear) => (
              <div
                key={answear.title}
                className={`w-1/3 border-2 p-3 text-center rounded-xl flex justify-center items-center px-8 ${
                  !answear.isCorrect ? 'border-red-600' : 'border-green-400'
                } `}
              >
                {answear.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}

export default GameSummary
