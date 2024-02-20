import { Coins, Pen, Plus, Timer, X } from 'lucide-react'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import EditableAnswear from './EditableAnswear'
import { answearProps, questionsProps } from '@/types/data'
import { Button } from '../ui/button'
import { number } from 'zod'
import { Input } from '../ui/input'

const EditableQuestion = ({
  question,
  index,
  reference,
  onDelete,
}: {
  question: questionsProps
  index: number
  reference: React.RefObject<HTMLDivElement>[]
  onDelete: (index: number) => void
}) => {
  const ref = reference[index]
  useEffect(() => {
    if (ref && ref.current) {
      // Example: log the current element's text content
      console.log(ref.current.textContent)
    }
  }, [ref])

  const [answears, setAnswears] = useState<answearProps[]>(question.answears)

  const [image, setImage] = useState<string | null>(question.img)

  const showImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files)
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }
  console.log(reference)

  const addNewAnswear = () => {
    const newAnswear = {
      title: 'Pytanie',
      isCorrect: false,
    }
    setAnswears([...answears, newAnswear])
  }
  return (
    <div
      ref={ref}
      className={`w-full bg-slate-950 col-span-2  p-4 flex justify-evenly items-center text-center flex-col rounded-xl gap-3 border-2 relative`}
    >
      <Button
        className="absolute right-0 top-0 bg-transparent hover:bg-transparent text-red-500 hover:text-red-400"
        onClick={() => onDelete(index)}
      >
        <X />
      </Button>
      <div className="flex">
        <div className="flex flex-col items-center justify-center px-8">
          <Timer />
          {question.time}s
        </div>
        <div className="relative">
          {image ? (
            <Image
              alt="quizphoto"
              src={image}
              width={100}
              height={100}
              className=""
            />
          ) : (
            <div className="w-full bg-slate-950 col-span-2  border p-8">
              <p>Zdjęcie</p>
            </div>
          )}
          <div className="absolute bg-red-500 flex p-1   right-0 top-0">
            <Input
              type="file"
              name={`file-${index}`}
              id={`imgInput-${index}`}
              className="hidden"
              onChange={(e) => showImage(e)}
            />
            <label htmlFor={`imgInput-${index}`} className="cursor-pointer">
              <Pen size={20} />{' '}
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-8">
          <Coins />
          {question.points}
        </div>
      </div>
      <p
        className="text-xl break-words max-w-full"
        id="editableQuestionTitle"
        contentEditable
        suppressContentEditableWarning={true}
      >
        {question.title}
      </p>
      <div className=" flex flex-wrap gap-3 justify-center">
        {answears.map((answear: any, index: number) => (
          <EditableAnswear answear={answear} key={index} />
        ))}
      </div>
      <Button
        className="w-full bg-slate-950 col-span-2 hover:bg-slate-800 border py-8"
        onClick={() => {
          addNewAnswear()
        }}
      >
        <Plus />
      </Button>
    </div>
  )
}

export default EditableQuestion
