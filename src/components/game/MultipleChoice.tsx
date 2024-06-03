import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'

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

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
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
      {answears.map((answear: any, i: number) => (
        <motion.div
          onClick={() => {
            setIsAnimate(true)
            setClickedButton(answear)
          }}
          key={answear.id || answear.title}
          className={`text-xl md:text-2xl text-white  md:col-span-1 col-span-2 w-full  min-h-[10vh] ${buttonColors[i]} rounded-sm flex justify-center items-center text-center cursor-pointer text-wrap `}
          animate={
            isAnimate === true && {
              border: ['3px solid white', '3px solid black', '3px solid white'],
            }
          }
          transition={{ repeat: 2, duration: 0.5 }}
          onAnimationComplete={() => {
            checkAnswear()
          }}
        >
          <p className="w-full h-full p-4 flex justify-center items-center ">
            {answear.title}
          </p>
        </motion.div>
      ))}

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

export default MultipleChoice
