'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import {
  Award,
  CheckCircle2,
  Coins,
  CoinsIcon,
  Gamepad2,
  XCircle,
} from 'lucide-react'

import { Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getQuizBySlug } from '@/lib/actions'
import Link from 'next/link'
import { questionsProps } from '@/types/data'
import EditQuizButton from '@/components/layouts/EditQuizButton'
const EditQuiz = ({ quiz }: { quiz: any }) => {
  const { questions } = quiz

  const editableTitle = React.useRef<HTMLHeadingElement>(null)
  const editableLevel = React.useRef<HTMLParagraphElement>(null)
  const editableDesc = React.useRef<HTMLParagraphElement>(null)

  const editableQuestions = useRef(
    Array.from({ length: questions.length }, () => React.createRef())
  )

  const saveQuiz = () => {
    console.log(editableTitle.current?.textContent)
    console.log(editableLevel.current?.textContent)
    console.log(editableDesc.current?.textContent)
    console.log(editableQuestions.current)
  }
  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3">
      <div className=" text-2xl text-white p4 col-span-2 w-full ">
        <h1
          className="break-words max-w-full"
          contentEditable
          suppressContentEditableWarning={true}
          ref={editableTitle}
        >
          {quiz.title}
        </h1>
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
      </div>
      <div className="text-white   p4 col-span-2   rounded-xl flex flex-col items-center justify-between  text-md gap-1">
        {/* <div className="">Test z wiedzy o Włoskich krajobrazach</div> */}
        <Link href={`/game/${quiz.slug}`} className="block w-full">
          <Button className="w-full bg-purple-600 hover:bg-purple-500 text-2xl py-8">
            Graj
          </Button>
        </Link>
        <Button
          className="w-full bg-red-500 col-span-2 hover:bg-red-400 text-xl py-6"
          onClick={() => saveQuiz()}
        >
          Zapisz
        </Button>
      </div>
      <div className="text-white text-sm bg-slate-800 p4 col-span-2 w-full text-center h-[100px] rounded-xl flex justify-evenly items-center ">
        <div className="flex flex-col  justify-center items-center">
          <Timer size={30} />
          <p className=" border-b-[2px] border-white">Czas trwania</p>
          {/* <p>
        {quizDuration.minutes}m {quizDuration.seconds}s
      </p> */}
        </div>
        <div className="flex flex-col  justify-center items-center">
          <Gamepad2 size={30} />
          <p className=" border-b-[2px] border-white">Poziom</p>
          <p
            className="break-words max-w-full"
            contentEditable
            suppressContentEditableWarning={true}
            ref={editableLevel}
          >
            {quiz.level}
          </p>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <Coins size={30} />
          <p className=" border-b-[2px] border-white">Max punktów</p>
          <p
            className="
      "
          >
            {/* {quizMaxPoints} */}
          </p>
        </div>
      </div>

      <div className="text-white   p4 col-span-2  r min-h-[150px] rounded-xl flex flex-col items-center justify-center text-md gap-1">
        <p
          className="break-words max-w-full"
          contentEditable
          suppressContentEditableWarning={true}
          ref={editableDesc}
        >
          {quiz.desc}{' '}
        </p>
      </div>

      {questions.map((question: any, index: number) => (
        <div
          key={question.title}
          ref={editableQuestions.current[index]}
          className={`w-full bg-slate-950 col-span-2  p-4 flex justify-evenly items-center text-center flex-col rounded-xl gap-3 border-2 `}
          //ref={editableQuestions}
        >
          <p
            className="text-xl break-words max-w-full"
            contentEditable
            suppressContentEditableWarning={true}
          >
            {question.title}
          </p>
          <div className=" flex flex-wrap gap-3 justify-center">
            {question.answears.map((answear: any) => (
              <div
                contentEditable
                suppressContentEditableWarning={true}
                key={answear.title}
                className={`break-words max-w-1/3 border-2 p-3 text-center rounded-xl flex justify-center items-center  ${
                  !answear.isCorrect ? 'border-red-600' : 'border-green-400'
                } `}
              >
                {answear.title}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button
        className="w-full bg-red-500 col-span-2 hover:bg-red-400"
        onClick={() => saveQuiz()}
      >
        Zapisz
      </Button>
    </main>
  )
}

export default EditQuiz
