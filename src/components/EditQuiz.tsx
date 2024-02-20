'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import {
  Award,
  CheckCircle2,
  Coins,
  CoinsIcon,
  Gamepad2,
  Pen,
  Plus,
  XCircle,
} from 'lucide-react'

import { Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getQuizBySlug } from '@/lib/actions'
import Link from 'next/link'
import { questionsProps } from '@/types/data'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import EditableQuestion from './editables/EditableQuestion'
import { v4 as uuidv4 } from 'uuid'

const EditQuiz = ({ quiz }: { quiz: any }) => {
  const { questions: initialQuestions } = quiz

  const [questions, setQuestions] = useState(initialQuestions)
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

  const editableTitle = React.useRef<HTMLHeadingElement>(null)
  const editableLevel = React.useRef<HTMLParagraphElement>(null)
  const editableDesc = React.useRef<HTMLParagraphElement>(null)

  const editableQuestionsRef = useRef<Array<React.RefObject<HTMLDivElement>>>(
    Array.from({ length: questions.length }, () =>
      React.createRef<HTMLDivElement>()
    )
  )

  const addNewQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      title: 'Pytanie',
      correctAnswear: false,
      points: 20,
      answears: [],
      time: 20,
      img: '',
    }
    setQuestions([...questions, newQuestion])
  }

  const deleteQuestion = (id: number) => {
    const updatedQuestions = questions.filter((question: any) => {
      if (question.id) return question.id !== id
      else return question.title !== id
    })
    setQuestions(updatedQuestions)
  }

  const saveQuiz = () => {
    console.log(editableTitle.current?.textContent)
    console.log(editableLevel.current?.textContent)
    console.log(editableDesc.current?.textContent)

    const editableQuestionValues: {
      title: Element | null
      answers: { title: any; isCorrect: any }[]
    }[] = []

    editableQuestionsRef.current?.forEach(
      (questionRef: React.RefObject<HTMLDivElement>, index: number) => {
        const questionElement = questionRef.current
        console.log(questionElement)
        // Ensure questionElement is not null before accessing its properties
        if (questionElement) {
          const answers = Array.from(
            questionElement.querySelectorAll('.editableAnswears')
          ).map((answear: any) => {
            const isCorrect = answear.classList.contains('correct')
            return { title: answear.textContent, isCorrect: isCorrect }
          })
          editableQuestionValues.push({
            title: questionElement.querySelector('#editableQuestionTitle'),
            answers: answers,
          })
        }
      }
    )

    console.log(editableQuestionValues)
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
          <p>
            {quizDuration.minutes}m {quizDuration.seconds}s
          </p>
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
            {quizMaxPoints}
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
        <EditableQuestion
          question={question}
          index={question.id || question.title}
          reference={editableQuestionsRef.current}
          key={question.id || question.title}
          onDelete={deleteQuestion}
        />
      ))}
      <Button
        className="w-full bg-slate-950 col-span-2 hover:bg-slate-800 border py-8"
        onClick={() => addNewQuestion()}
      >
        <Plus />
      </Button>
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
