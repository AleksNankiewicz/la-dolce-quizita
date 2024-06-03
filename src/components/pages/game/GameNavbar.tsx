import Navbar from '@/components/layouts/Navbar'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import GameSheet from './GameExitDialog'

type GameNavbarProps = {
  currentQuestion: number
  totalQuestions: number
  hideAnswerType: boolean
}

const GameNavbar = ({
  currentQuestion,
  totalQuestions,
  hideAnswerType,
}: GameNavbarProps) => {
  return (
    <Navbar
      className={cn(
        'flex-col items-start gap-5 bg-transparent ',
        hideAnswerType && 'border-b-0'
      )}
    >
      <div className="flex justify-between text-xl font-semibold w-full">
        <GameSheet />
        {!hideAnswerType && <p>Wybierz odpowiedź</p>}
        <p className="relative z-40">
          {currentQuestion}/{totalQuestions}
        </p>
      </div>
    </Navbar>
  )
}

export default GameNavbar
