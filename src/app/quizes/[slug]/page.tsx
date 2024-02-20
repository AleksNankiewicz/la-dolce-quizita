import React from 'react'
import Image from 'next/image'
import { Award, Coins, CoinsIcon, Gamepad2 } from 'lucide-react'

import { Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getQuizBySlug } from '@/lib/actions'
import Link from 'next/link'
import { questionsProps } from '@/types/data'
import EditQuizButton from '@/components/layouts/EditQuizButton'

const SingleQuizPage = async (params: any) => {
  const slug = params.params.slug
  const quiz = await getQuizBySlug(slug)
  // console.log(quiz)
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

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3">
      <div className=" text-2xl text-white p4 col-span-2 w-full ">
        <h1 className="">{quiz.title}</h1>
      </div>
      <div className="text-black text-2xl  p4 col-span-2 text-center min-h-[150px] rounded-xl relative  overflow-hidden flex justify-center">
        <div className="relative w-52 h-full">
          <Image
            src={quiz.img}
            fill
            alt="background"
            className="overflow-hidden rounded-2xl opacity-40   duration-300 "
          />
        </div>
        <EditQuizButton slug={quiz.slug} />
      </div>
      <div className="text-white   p4 col-span-2   rounded-xl flex flex-col items-center justify-between  text-md gap-1">
        {/* <div className="">Test z wiedzy o Włoskich krajobrazach</div> */}
        <Link href={`/game/${quiz.slug}`} className="block w-full">
          <Button className="w-full bg-purple-600 hover:bg-purple-500 text-2xl py-8">
            Graj
          </Button>
        </Link>
      </div>
      <div className="text-white text-sm bg-slate-800 p4 col-span-2 w-full text-center h-[100px] rounded-xl flex justify-evenly items-center ">
        <div className="flex flex-col  justify-center items-center">
          <Timer size={30} />
          <p className=" border-b-[2px] border-white">Czas trwania</p>
          <p>
            {/* {quizDuration}s */}
            {quizDuration.minutes}m {quizDuration.seconds}s
          </p>
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

      {quiz.records && (
        <>
          <div className=" text-2xl text-white p4 col-span-2 w-full ">
            <h1 className="">Rekordy</h1>
          </div>
          <div className="text-white  bg-slate-800  col-span-2 w-full text-center  rounded-xl flex-col justify-center items-center p-4  ">
            {quiz.records.map((record: any, i: number) => (
              <div
                key={i}
                className="flex text-sm  justify-between items-center py-1"
              >
                <div className="flex items-center gap-2">
                  {' '}
                  <Image
                    className="rounded-full w-10 h-10"
                    src={record.img ? record.img : '/noavatar.png'}
                    alt="avatar"
                    width={25}
                    height={25}
                  />
                  <p>{record.username}</p>
                </div>

                <div className="flex flex-col-reverse">
                  <p>{record.score}</p>
                  <Coins size={25} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default SingleQuizPage
