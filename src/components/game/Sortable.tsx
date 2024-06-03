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
  setAnswears: ([]) => void
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
  setAnswears,
  setIsAnimate,
  setClickedButton,
  isAnimate,
  checkSortableAnswear,
  isCorrectAnswear,
  isGameRunning,
  nextButtonRef,
  nextQuestion,
}) => {
  // console.log(isCorrectAnswear)

  const [answers, setAnswers] = useState<Answear[]>(answears)
  const [corrected, setCorrected] = useState(false)
  const handleSubmit = () => {
    setIsAnimate(true)
  }

  useEffect(() => {
    setCorrected(false)
    if (isCorrectAnswear) {
      setCorrected(true)
    }
  }, [isCorrectAnswear])

  useEffect(() => {
    // setCorrected(false)
    // if (isCorrectAnswear) {
    //   setCorrected(true)
    // }
    setAnswers(answears)
  }, [answears])

  // console.log(isGameRunning)
  return (
    <>
      <Reorder.Group
        axis="y"
        values={answers}
        onReorder={(newAnswers) => {
          setAnswers(newAnswers)
          // setAnswears(newAnswers)
        }}
        className="w-full col-span-2 h-1/2 flex flex-col gap-2"
      >
        {answers.map((answer, index) => (
          <Reorder.Item key={answer.id} value={answer}>
            <motion.div
              className={`w-full bg-white text-black p-2 border-4 ${
                !isGameRunning
                  ? corrected
                    ? 'border-green-400'
                    : 'border-red-700'
                  : 'border-purple-700'
              }`}
              animate={
                isAnimate === true && {
                  boxShadow: [
                    '0px 0px 0px 3px black',
                    '0px 0px 0px 3px #6d28d9',
                    '0px 0px 0px 3px black',
                  ],
                }
              }
              onAnimationComplete={() => {
                checkSortableAnswear(answers)
                setIsAnimate(false)
              }}
              transition={{ repeat: 2, duration: 0.75 }}
            >
              <p>{index + 1}</p>
              <p>{answer.title}</p>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      {isGameRunning && (
        <Button
          ref={nextButtonRef}
          onClick={() => handleSubmit()}
          className="col-span-2 py-8 bg-purple-600 hover:bg-purple-500 text-2xl"
        >
          Zatwierdź
        </Button>
      )}
      {!isGameRunning && (
        <Button
          ref={nextButtonRef}
          onClick={() => nextQuestion()}
          className="col-span-2 py-8 bg-purple-600 hover:bg-purple-500 text-2xl"
        >
          Dalej
        </Button>
      )}
    </>
  )
}

export default Sortable
