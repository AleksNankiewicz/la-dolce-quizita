import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface Answear {
  id?: string
  title: string
}

interface OpenChoiceProps {
  answears: Answear[]
  setIsAnimate: React.Dispatch<React.SetStateAction<boolean>>
  setClickedButton: React.Dispatch<React.SetStateAction<Answear>>
  isAnimate: boolean

  checkOpenAnswear: (openAnswear: string) => void
  isCorrectAnswear: boolean
  isGameRunning: boolean
  nextButtonRef: React.RefObject<HTMLButtonElement>
  nextQuestion: () => void
  buttonColors: string[] // Assuming buttonColors is passed as prop
}

const OpenChoice: React.FC<OpenChoiceProps> = ({
  answears,
  setIsAnimate,
  setClickedButton,
  isAnimate,

  checkOpenAnswear,
  isCorrectAnswear,
  isGameRunning,
  nextButtonRef,
  nextQuestion,
  buttonColors,
}) => {
  //   console.log(answears)

  const [inputValue, setInputValue] = useState('')

  const [isSubmited, setIsSubmited] = useState(false)

  const [anim, setAnim] = useState(false)

  const handleSubmit = () => {
    checkOpenAnswear(inputValue)
    setIsSubmited(true)
  }
  useEffect(() => {
    if (!isGameRunning) {
      setIsAnimate(false) // Reset anim state when game is not running
    }
  }, [isGameRunning])
  console.log('anim', isAnimate)
  return (
    <div className="col-span-2 w-full flex flex-col gap-3 h-[42vh] justify-between ">
      <motion.div
        className={` col-span-2  border-4 ${
          !isGameRunning
            ? isCorrectAnswear
              ? 'border-green-400'
              : 'border-red-700'
            : 'border-purple-700'
        }`}
        animate={isAnimate ? 'customShadow' : ''}
        transition={{ repeat: 2, duration: 0.75 }}
        onAnimationComplete={() => {
          handleSubmit()
          setIsAnimate(false)
        }}
        variants={{
          customShadow: {
            boxShadow: [
              '0px 0px 0px 3px black',
              '0px 0px 0px 3px #6d28d9',
              '0px 0px 0px 3px black',
            ],
          },
        }}
      >
        <Input
          value={inputValue}
          className={`text-2xl py-6 rounded-none outline-purple-700 border-purple-700 border-2 ${
            !isGameRunning
              ? isCorrectAnswear
                ? 'border-green-400'
                : 'border-red-700'
              : 'border-purple-700'
          } `}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsAnimate(true)
            }
          }}
        />
      </motion.div>

      {!isGameRunning && (
        <Button
          ref={nextButtonRef}
          onClick={() => {
            nextQuestion()
            setInputValue('')
          }}
          className="col-span-2 py-10 bg-purple-600 hover:bg-purple-500 text-3xl "
        >
          Dalej
        </Button>
      )}
    </div>
  )
}

export default OpenChoice
