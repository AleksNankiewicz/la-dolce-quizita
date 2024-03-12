import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface Answear {
  id?: string
  title: string
}

interface MultipleChoiceProps {
  answears: Answear[]
  setIsAnimate: React.Dispatch<React.SetStateAction<boolean>>
  setClickedButton: React.Dispatch<React.SetStateAction<Answear>>
  isAnimate: boolean
  checkAnswear: () => void
  isCorrectAnswear: boolean
  isGameRunning: boolean
  nextButtonRef: React.RefObject<HTMLButtonElement>
  nextQuestion: () => void
  buttonColors: string[] // Assuming buttonColors is passed as prop
}

const OpenChoice: React.FC<MultipleChoiceProps> = ({
  answears,
  setIsAnimate,
  setClickedButton,
  isAnimate,
  checkAnswear,
  isCorrectAnswear,
  isGameRunning,
  nextButtonRef,
  nextQuestion,
  buttonColors,
}) => {
  //   console.log(answears)
  return (
    <>
      <Input />

      {isCorrectAnswear === true && (
        <motion.div
          className="w-5 h-5 bg-green-400 rounded-full absolute lg:hidden"
          initial={{ y: '60vh', x: '10vw' }}
          animate={{ y: '-5vw', x: ['40vw', '78vw'], opacity: [1, 1, 1, 0] }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
        ></motion.div>
      )}

      {!isGameRunning && (
        <Button
          ref={nextButtonRef}
          onClick={nextQuestion}
          className="col-span-2 py-10 bg-purple-600 hover:bg-purple-500 text-3xl"
        >
          Dalej
        </Button>
      )}
    </>
  )
}

export default OpenChoice
