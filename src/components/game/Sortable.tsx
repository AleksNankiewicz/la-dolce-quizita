import React, { useEffect, useState } from 'react'
import { Reorder, motion } from 'framer-motion'
import { Button } from '../ui/button'
import { shuffleArray } from '@/lib/utils'

interface Answear {
  id?: string
  title: string
}

interface SortableProps {
  answears: Answear[]
  setIsAnimate: React.Dispatch<React.SetStateAction<boolean>>
  setClickedButton: React.Dispatch<React.SetStateAction<Answear>>
  isAnimate: boolean
  checkSortableAnswear: ([]) => void
  isCorrectAnswear: boolean
  isGameRunning: boolean
  nextButtonRef: React.RefObject<HTMLButtonElement>
  nextQuestion: () => void
  buttonColors: string[] // Assuming buttonColors is passed as prop
}

const Sortable: React.FC<SortableProps> = ({
  answears,
  setIsAnimate,
  setClickedButton,
  isAnimate,
  checkSortableAnswear,
  isCorrectAnswear,
  isGameRunning,
  nextButtonRef,
  nextQuestion,
}) => {
  //   console.log(answears)

  const [answers, setAnswers] = useState<Answear[]>(answears)

  useEffect(() => {
    setAnswers(answears)
  }, [answears])
  return (
    <>
      <Reorder.Group
        axis="y"
        values={answers}
        onReorder={(newAnswers) => setAnswers(newAnswers)}
        className="w-full col-span-2 h-1/2 flex flex-col gap-2"
      >
        {answers.map((answer) => (
          <Reorder.Item key={answer.id} value={answer}>
            <div className="w-full bg-white text-black p-2 border-purple-700 border-2">
              {answer.title}
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <Button
        ref={nextButtonRef}
        onClick={() => checkSortableAnswear(answers)}
        className="col-span-2 py-8 bg-purple-600 hover:bg-purple-500 text-2xl"
      >
        Zatwierdź
      </Button>
      {/* 
      {!isGameRunning && (
        <Button
          ref={nextButtonRef}
          onClick={nextQuestion}
          className="col-span-2 py-10 bg-purple-600 hover:bg-purple-500 text-3xl"
        >
          Dalej
        </Button>
      )} */}
    </>
  )
}

export default Sortable
