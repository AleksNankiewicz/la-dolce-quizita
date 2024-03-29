import React from 'react'
import Image from 'next/image'
import {
  Award,
  BadgeCheck,
  Coins,
  CoinsIcon,
  Gamepad2,
  ShieldQuestion,
} from 'lucide-react'

import { Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getQuizBySlug, getUserByEmail } from '@/lib/actions'
import Link from 'next/link'
import { UserProps, questionsProps, recordProps } from '@/types/data'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import GameRecordsBlock from '@/components/layouts/GameRecordsBlock'
import PlayQuizButton from '@/components/layouts/PlayQuizButton'
import { sliceArrayByPercentage } from '@/lib/utils'
import UserQuizRecord from '@/components/misc/UserQuizRecord'
import QuizAuthor from '@/components/misc/QuizAuthor'

const SingleQuizPage = async (params: any) => {
  const slug = params.params.slug
  const quiz = await getQuizBySlug(slug)
  // console.log(quiz)
  const quizAuthor: UserProps = await getUserByEmail(quiz.author)
  quiz.records.sort((a: recordProps, b: recordProps) => b.score - a.score)

  const quizDuration = {
    time: 0,
    minutes: 0,
    seconds: 0,
  }
  let quizMaxPoints = 0
  const slicedArr = sliceArrayByPercentage(
    quiz.questions,
    quiz.questionsPercent
  )
  slicedArr.forEach((question: questionsProps) => {
    quizDuration.time += question.time

    quizMaxPoints += question.points
  })

  quizDuration.minutes = Math.floor(quizDuration.time / 60)
  quizDuration.seconds = quizDuration.time - quizDuration.minutes * 60

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3">
      <div className=" text-2xl md:text-3xl text-white p4 col-span-2 w-full flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <h1 className="">{quiz.title}</h1>
          {quizAuthor && (
            <div className="hidden md:block">
              <QuizAuthor
                username={quizAuthor.username}
                img={quizAuthor.img}
                isVerified={quizAuthor.isVerified}
              />
            </div>
          )}
        </div>
        <UserQuizRecord records={quiz.records} quizMaxPoints={quizMaxPoints} />
      </div>
      {quiz.categoryName && (
        <div className=" md:text-xl  text-white p4 col-span-2 w-full -mt-3">
          <h1 className="text-purple-500">{quiz.categoryName}</h1>
        </div>
      )}
      {/* {quizAuthor && (
        <div className="md:hidden -my-2 max-w-24">
          <QuizAuthor
            username={quizAuthor.username}
            img={quizAuthor.img}
            isVerified={quizAuthor.isVerified}
          />
        </div>
      )} */}
      <div className="text-black text-2xl  p4 col-span-2 text-center min-h-[150px] rounded-xl relative  overflow-hidden flex justify-center">
        <div className="relative w-52 h-full">
          {quiz.img && (
            <Image
              src={quiz.img}
              fill
              alt="background"
              className="overflow-hidden rounded-2xl    duration-300 object-cover"
            />
          )}
          <EditQuizButton
            slug={quiz.slug}
            categorySlug={quiz.categorySlug}
            quizAuthor={quiz.author}
          />
        </div>
      </div>
      <PlayQuizButton slug={quiz.slug} access={quiz.access} />
      <div className="text-white text-sm bg-slate-800 p4 col-span-2 w-full text-center h-[100px] rounded-xl flex justify-evenly items-center ">
        <div className="flex flex-col  justify-center items-center">
          <ShieldQuestion size={30} />
          <p className=" border-b-[2px] border-white">Liczba pytań</p>
          <p>{slicedArr.length}</p>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <Gamepad2 size={30} />
          <p className=" border-b-[2px] border-white">Poziom</p>
          <p>{quiz.level}</p>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <Coins size={30} />
          <p className=" border-b-[2px] border-white">Max punktów</p>
          <p
            className="
          "
          >
            {quizMaxPoints}
          </p>
        </div>
      </div>

      <div className="text-white   p4 col-span-2  r min-h-[150px] rounded-xl flex flex-col items-center justify-center text-md gap-1">
        <p>{quiz.desc}</p>
      </div>

      {quiz.records.length !== 0 && (
        <>
          <div className=" text-2xl text-white p4 col-span-2 w-full ">
            <h1 className="">Rekordy</h1>
          </div>
          <div className="text-white  bg-slate-800  col-span-2 w-full text-center  rounded-xl flex-col justify-center items-center p-4   divide-y divide-gray-600 ">
            {quiz.records.map((record: recordProps, index: number) => (
              <GameRecordsBlock
                quizMaxPoints={quizMaxPoints}
                record={record}
                key={index}
              />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default SingleQuizPage
