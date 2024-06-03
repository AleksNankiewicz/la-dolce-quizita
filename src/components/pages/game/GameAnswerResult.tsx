import Navbar from '@/components/layouts/Navbar'
import { Badge } from '@/components/ui/badge'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
type GameAnswerResultProps = {
  isCorrect: boolean
  isIncorrect: boolean
  isTimeout: boolean
}

const GameAnswerResult = ({
  isCorrect,
  isIncorrect,
  isTimeout,
}: GameAnswerResultProps) => {
  const [resultContent, setResultContent] = useState<React.ReactNode | null>()

  useEffect(() => {
    if (isCorrect) {
      setResultContent(
        <div className=" bg-green-500 left-0 w-full flex flex-col items-center justify-center gap-4 py-4">
          <h1 className="font-semibold text-xl">Poprawna odpowiedź!</h1>
          <Badge className="text-emerald-500 bg-white pointer-events-none">
            +200
          </Badge>
        </div>
      )
    }
    if (isIncorrect) {
      setResultContent(
        <div className=" bg-red-500 left-0 w-full flex flex-col items-center justify-center gap-4 py-4">
          <h1 className="font-semibold text-xl">Niepoprawna odpowiedź!</h1>
          <Badge className="text-red-500 bg-white pointer-events-none">
            Następnym razem się postaraj
          </Badge>
        </div>
      )
    }
    if (isTimeout) {
      setResultContent(
        <div className=" bg-yellow-500 left-0 w-full flex flex-col items-center justify-center gap-4 py-4">
          <h1 className="font-semibold text-xl">Czas minął</h1>
          <Badge className="text-yellow-500 bg-white pointer-events-none">
            Postaraj się być szybszy
          </Badge>
        </div>
      )
    }
  }, [isCorrect, isIncorrect, isTimeout])

  return (
    <motion.div
      className="z-10  fixed top-0 bg-black left-0 w-full "
      initial={{ y: -400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {resultContent}
    </motion.div>
  )
}

export default GameAnswerResult
