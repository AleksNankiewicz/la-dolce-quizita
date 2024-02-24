'use client'
import React, { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Award,
  CheckCircle2,
  Coins,
  CoinsIcon,
  Gamepad2,
  Pen,
  Plus,
  X,
  XCircle,
} from 'lucide-react'

import { Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addQuiz, deleteQuiz, getQuizBySlug, uploadImages } from '@/lib/actions'
import Link from 'next/link'
import { questionsProps, quizProps } from '@/types/data'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import EditableQuestion from './editables/EditableQuestion'
import { v4 as uuidv4 } from 'uuid'
import { removeSpaces } from '@/lib/utils'
import { Input } from './ui/input'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const EditQuiz = ({ quiz }: { quiz: any }) => {
  const router = useRouter()
  const { questions: initialQuestions } = quiz

  const questionsWithIds = initialQuestions.map((question: any) => ({
    ...question,
    id: uuidv4(), // Generate a unique ID for each question
  }))

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
  const editableImage = React.useRef<HTMLInputElement>(null)
  const [editableQuestionsRef, setEditableQuestionsRef] = useState<
    Array<React.RefObject<HTMLDivElement>>
  >(initialQuestions.map(() => React.createRef<HTMLDivElement>()))

  const [image, setImage] = useState(quiz.img)

  const showImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }

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
  }

  const deleteQuestion = (id: string, refId: number) => {
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

    setQuestions(updatedQuestions)
    setEditableQuestionsRef(updatedQuestionRefs)
  }

  const handleDeleteQuiz = async () => {
    try {
      await deleteQuiz(quiz.slug)

      toast.success('Quiz usunięty!', {
        duration: 3000,
      })
    } catch (err: any) {
      console.log(err)
      throw new Error(err)
    }
    setTimeout(() => {
      // router.push('/')
      window.location.href = '/'
    }, 2000)
  }

  const saveQuiz = async () => {
    const title = editableTitle.current?.textContent
      ? editableTitle.current.textContent
      : ''
    const level = editableLevel.current?.textContent
      ? editableLevel.current.textContent
      : ''
    const desc = editableDesc.current?.textContent
      ? editableDesc.current.textContent
      : ''
    const img =
      editableImage.current?.files && editableImage.current?.files.length > 0
        ? editableImage.current?.files[0]
        : quiz.img

    console.log(quiz.img)

    const editableQuestionValues: {
      title: string | null
      time: number | null
      points: number | null
      img: '' | File
      answears: { title: any; isCorrect: any }[]
      id: string
    }[] = []

    const formData = new FormData()
    formData.append('imgMain', img)
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

          // console.log(questions[index].img)

          const image: string | File =
            imageElement && imageElement.files && imageElement.files.length > 0
              ? imageElement.files[0]
              : questions[index].img

          //const image = questions[index].img

          formData.append(`img-${index}`, image)

          //console.log(formData)

          const answers = Array.from(
            questionElement.querySelectorAll('.editableAnswears')
          ).map((answear: any) => {
            const isCorrect = answear.classList.contains('correct')
            return {
              title: answear.textContent,
              isCorrect: isCorrect,
              id: uuidv4(),
            }
          })
          editableQuestionValues.push({
            title: title,
            id: uuidv4(),
            time: time,
            points: points,
            answears: answers,
            img: '',
          })
        }
      }
    )

    let imageRefs: any[] = []
    try {
      imageRefs = await uploadImages(formData)
      console.log(imageRefs)
    } catch {
      console.log('err')
    }

    const updatedEditableQuestionValues = editableQuestionValues.map(
      (question, index) => {
        const imageRef = imageRefs.slice(1, imageRefs.length)[index]

        return {
          ...question,
          img: imageRef,
        }
      }
    )

    const savedQuiz: quizProps = {
      title: title,
      desc: desc,
      level: level,
      slug: quiz.slug || Math.floor(Math.random() * 999923) + '',
      img: imageRefs[0],
      records: [],
      questions: updatedEditableQuestionValues,
    }
    // return console.log(savedQuiz)
    try {
      await addQuiz(savedQuiz)
      toast('Quiz Zapisany!', {
        icon: '😊',
      })
    } catch (err: any) {
      toast('Nie udało się zapisać quizu!', {
        icon: '😢',
      })
      console.log(err)
      throw new Error(err)
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
          {image ? (
            <Image
              alt="quizphoto"
              src={image}
              width={2000}
              height={2000}
              className="rounded-tr-xl"
            />
          ) : (
            <div className="w-full bg-slate-950 col-span-2  border  text-white h-full flex justify-center items-center rounded-xl">
              <p>Zdjęcie</p>
            </div>
          )}
          <div className="absolute bg-red-500 flex p-1   right-0 top-0 text-white rounded-tr-xl">
            <Input
              type="file"
              name={`file-main`}
              id={`imgInputmain`}
              className="hidden "
              onChange={(e) => showImage(e)}
              ref={editableImage}
            />
            <label htmlFor={`imgInputmain`} className="cursor-pointer ">
              <Pen size={20} />{' '}
            </label>
          </div>
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
          className="break-words max-w-full min-h-full w-full"
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
        className="w-full bg-red-500 col-span-2 hover:bg-red-400 text-2xl py-8"
        onClick={() => saveQuiz()}
      >
        Zapisz
      </Button>
      <Button
        className="w-full bg-slate-800 col-span-2 hover:bg-slate-700 text-red-500"
        onClick={() =>
          toast(
            (t) => (
              <div className="flex flex-col items-center gap-2 ">
                <p className="font-bold">Czy chcesz napewno usunąć quiz?</p>
                <div className="flex gap-2">
                  <Button
                    className="bg-green-400 col-span-2 hover:bg-green-300 text-2xl "
                    onClick={() => {
                      toast.dismiss(t.id)
                      handleDeleteQuiz()
                    }}
                  >
                    Tak
                  </Button>
                  <Button
                    className="bg-red-500 col-span-2 hover:bg-red-400 text-2xl "
                    onClick={() => toast.dismiss(t.id)}
                  >
                    Nie
                  </Button>
                </div>
              </div>
            ),
            {
              duration: Infinity,
            }
          )
        }
      >
        Usuń Quiz
      </Button>
    </main>
  )
}

export default EditQuiz
