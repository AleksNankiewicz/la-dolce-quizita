'use client'

import { updateAfterGame, updateQuizPlayCount } from '@/lib/actions'
import { LevelProps, questionsProps, sessionUserProps } from '@/types/data'
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { title } from 'process'
import React, { useEffect, useState } from 'react'
import HomeSeeAll from './atoms/HomeSeeAll'
import Link from 'next/link'
import useNavStore from '@/lib/store'
import toast from 'react-hot-toast'
// import { useGameStore } from '@/lib/store'
// import React, { useEffect } from 'react'

const GameSummary = ({
  questions,
  quizSlug,
}: {
  questions: questionsProps[]
  quizSlug: string
}) => {
  const refreshNavbar = useNavStore((state) => state.setRefresh)

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
  const [distanceBetweenRecords, setDistanceBetweenRecords] = useState(0)
  const [newLevel, setNewLevel] = useState<LevelProps>()
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
        try {
          await updateQuizPlayCount(quizSlug)
          const ResponseData = await updateAfterGame(
            email,
            scoredPoints,
            allCorrect,
            quizSlug
          )
          if (ResponseData?.distanceBetweenRecords) {
            setDistanceBetweenRecords(ResponseData.distanceBetweenRecords)
          }
          if (ResponseData?.newLevelData) {
            setNewLevel(ResponseData.newLevelData)
          }

          console.log(ResponseData)

          console.log('user after game updated!')
        } catch (err: any) {
          console.log(err)
          throw new Error(err)
        }
      }
      update()
    }
  }, [email])

  useEffect(() => {
    if (newLevel) {
      refreshNavbar(true)
      toast(
        <div className=" text-center">
          <p>Osiągnołeś nowy level!</p>
          <p className="text-green-400 text-3xl font-bold">{newLevel.number}</p>
        </div>,
        {
          duration: 3000,
          id: 'clipboard',
        }
      )

      setTimeout(() => {
        toast(
          <div className=" text-center">
            <p>Oblokowano nową odznakę</p>
            <div className="text-green-400 text-3xl font-bold w-full flex justify-center">
              <Image src={newLevel.badge} alt="frame" width={40} height={40} />
            </div>
          </div>,
          { duration: 3000, id: 'secondToast' }
        )
      }, 3000) // Adjust the delay as needed
      setTimeout(() => {
        toast(
          <div className=" text-center">
            <p>Oblokowano nową obramówkę</p>
            <div className="text-green-400 text-3xl font-bold w-full flex justify-center">
              <Image
                src={newLevel.profileFrame}
                alt="frame"
                width={40}
                height={40}
              />
            </div>
          </div>,
          { duration: 3000, id: 'thirdtToast' }
        )
      }, 6000) // Adjust the delay as needed
    }
  }, [newLevel])

  // console.log(scoredPoints)

  return (
    <main className=" w-full h-screen p-4 grid grid-cols-2 gap-3 select-none fixed bg-black/95 left-0 top-0 overflow-scroll  py-16 md:px-7 overflow-x-hidden overflow-y-scroll">
      <div className="col-span-2 w-full flex  items-center flex-col gap-2 text-center">
        <h1 className="text-3xl text-green-400">Gratulacje</h1>
        <div className="text-2xl">
          Zdobyłeś{' '}
          <span className="text-green-400 text-3xl">{scoredPoints} </span>
          punktów!
        </div>

        {distanceBetweenRecords !== 0 && (
          <div className="">
            Pobiłeś swój rekord o{' '}
            <span className="text-green-400 text-2xl">{scoredPoints} </span>
            punktów!
          </div>
        )}
        <div className="h-0.5 w-full bg-white rounded-full"></div>
        <div className="w-8/12  md:text-2xl text-[17px]">
          Odpowiedziałeś poprawnie na{' '}
          <span className="text-green-400 text-2xl  md:text-3xl">
            {correctAnswearsNumber}{' '}
          </span>{' '}
          z {allQuestionsNumber} pytań
        </div>
        <div className=" text-sm">Poniżej znajdziesz swoje odpowiedzi</div>
      </div>
      {questions.map((question) => (
        <div
          key={question.id || question.title}
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

          {question.title ? (
            <p className="text-xl">{question.title}</p>
          ) : (
            question.img && (
              <Image
                src={question.img}
                width={50}
                height={50}
                alt="questionPhoto"
              />
            )
          )}

          <div className=" flex flex-wrap gap-3 justify-center">
            {question.answears.map((answear) => (
              <React.Fragment key={answear.id}>
                {question.type == 'multiple-choice' || !question.type ? (
                  <div
                    key={answear.id || answear.title}
                    className={`w-1/3 min-w-28 border-2 p-3 text-center rounded-xl flex justify-center items-center px-8 ${
                      !answear.isCorrect ? 'border-red-600' : 'border-green-400'
                    } `}
                  >
                    {answear.title}
                  </div>
                ) : null}
                {question.type == 'sortable' ? (
                  <div
                    key={answear.id || answear.title}
                    className={`w-full min-w-28 border-2 p-3 text-center rounded-xl flex justify-center items-center px-8  `}
                  >
                    {answear.title}
                  </div>
                ) : null}
              </React.Fragment>
            ))}
            {question.type == 'open-ended' ? (
              <div
                className={`w-full min-w-28 border-2 p-3 text-center rounded-xl flex justify-center items-center px-8  `}
              >
                {question.answears[0].title}
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <div className="col-span-2 w-full">
        <HomeSeeAll path="/" label="Wróć do menu" />
      </div>
    </main>
  )
}

export default GameSummary
