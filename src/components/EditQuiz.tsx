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
import { questionsProps, quizProps } from '@/types/data'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import EditableQuestion from './editables/EditableQuestion'
import { v4 as uuidv4 } from 'uuid'
import { removeSpaces } from '@/lib/utils'

const EditQuiz = ({ quiz }: { quiz: any }) => {
  const { questions: initialQuestions } = quiz

  const questionsWithIds = initialQuestions.map((question: any) => ({
    ...question,
    id: uuidv4(), // Generate a unique ID for each question
  }))
  console.log(questionsWithIds)
  const [questions, setQuestions] = useState(questionsWithIds)
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

  const [editableQuestionsRef, setEditableQuestionsRef] = useState<
    Array<React.RefObject<HTMLDivElement>>
  >(initialQuestions.map(() => React.createRef<HTMLDivElement>()))

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
    const newQuestionRef = React.createRef<HTMLDivElement>()

    // Update refs array with the new ref
    setEditableQuestionsRef([...editableQuestionsRef, newQuestionRef])
    setQuestions([...questions, newQuestion])

    console.log(questions)
  }

  const deleteQuestion = (id: string, refId: number) => {
    //console.log(refId)
    const updatedQuestions = questions.filter((question: any) => {
      if (question.id) {
        console.log('Question id:', question.id)
        return question.id !== id
      } else {
        console.log('Question title:', question.title)
        return question.title !== id
      }
    })

    console.log(updatedQuestions)

    const updatedQuestionRefs = editableQuestionsRef.filter(
      (_, index) => index !== refId
    )
    // console.log(updatedQuestionRefs)

    // Update the state with the filtered questions and questionRefs
    setQuestions(updatedQuestions)
    setEditableQuestionsRef(updatedQuestionRefs)
    setQuestions(updatedQuestions)
  }

  const saveQuiz = () => {
    console.log(editableTitle.current?.textContent)
    console.log(editableDesc.current?.textContent)
    console.log(editableLevel.current?.textContent)

    const title = editableTitle.current?.textContent
      ? editableTitle.current.textContent
      : ''
    const level = editableLevel.current?.textContent
      ? editableLevel.current.textContent
      : ''
    const desc = editableDesc.current?.textContent
      ? editableDesc.current.textContent
      : ''

    const editableQuestionValues: {
      title: string | null
      time: number | null
      points: number | null
      img: '' | File
      answears: { title: any; isCorrect: any }[]
    }[] = []

    editableQuestionsRef.forEach(
      (questionRef: React.RefObject<HTMLDivElement>, index: number) => {
        const questionElement = questionRef.current

        if (questionElement) {
          const titleElement = questionElement.querySelector(
            'p#editableQuestionTitle'
          )

          const timeElement = questionElement.querySelector(
            'p#editableQuestionTime'
          )
          const pointsElement = questionElement.querySelector(
            'p#editableQuestionPoints'
          )
          const imageElement = questionElement.querySelector<HTMLInputElement>(
            `#imgInput${questionElement.id}`
          )
          // console.log(imageElement)
          const title = titleElement ? titleElement.textContent : ''
          const time = timeElement ? Number(timeElement.textContent) : 20
          const points = pointsElement ? Number(pointsElement.textContent) : 20

          const image: '' | File =
            imageElement && imageElement.files ? imageElement.files[0] : ''

          const answers = Array.from(
            questionElement.querySelectorAll('.editableAnswears')
          ).map((answear: any) => {
            const isCorrect = answear.classList.contains('correct')
            return { title: answear.textContent, isCorrect: isCorrect }
          })
          editableQuestionValues.push({
            title: title,
            time: time,
            points: points,
            answears: answers,
            img: image,
          })
        }
      }
    )

    const savedQuiz: quizProps = {
      title: title,
      desc: desc,
      level: level,
      slug: '',
      img: '',
      records: [],
      questions: editableQuestionValues,
    }

    console.log(savedQuiz)
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
          refId={index}
          index={question.id || removeSpaces(question.title)}
          reference={editableQuestionsRef}
          key={question.id || removeSpaces(question.title)}
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
