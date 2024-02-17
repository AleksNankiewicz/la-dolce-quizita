'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Timer } from 'lucide-react'
import React, { useState } from 'react'
import { Progress } from '../ui/progress'
import Link from 'next/link'
import { useGameStore } from '@/lib/store'
import { AnimatedNumber } from '../animations/AnimatedNumber'

const Navbar = () => {
  const isGameStarted = useGameStore((state) => state.isGameStarted)

  const actualQuestionTime = useGameStore((state) => state.actualQuestionTime)

  const questionsNumber = useGameStore((state) => state.questionsNumber)

  const actualQuestionsNumber = useGameStore(
    (state) => state.actualQuestionsNumber
  )

  const gamePoints = useGameStore((state) => state.gamePoints)

  const [isUserLogged, setIsUserLogged] = useState(false)

  return (
    <div
      className={`w-full   text-white flex bg-purple-700 p-1 ${
        isGameStarted ? 'justify-center' : 'justify-end'
      }  items-center rounded-b-xl`}
    >
      <div
        className={`${
          isGameStarted ? 'hidden' : 'flex'
        }  w-2/3 justify-start font-bold text-center`}
      >
        <Link href={'/'} className="pl-3 text-xl">
          Włoski Quiz
        </Link>
      </div>
      <div
        className={`${
          isGameStarted ? 'flex' : 'hidden'
        }  w-1/3 justify-start font-bold text-center`}
      >
        <p className="pl-3">{`${actualQuestionsNumber}/${questionsNumber}`}</p>
      </div>

      <div
        className={`${
          isGameStarted ? 'flex' : 'hidden'
        } w-1/3 flex flex-col items-center justify-center gap-2`}
      >
        <Timer />
        <Progress value={actualQuestionTime / 22 + 100} className="h-2 " />
      </div>
      <div className="flex justify-center items-center gap-3 w-1/3 ml-6">
        <Avatar>
          <AvatarImage
            className="rounded-full w-7 h-7 m-1"
            src="/noavatar.png"
            alt="avatar"
          />
        </Avatar>

        <div className="flex flex-col justify-end">
          <div className="">{isUserLogged ? 'Aleks N' : 'Gość'}</div>

          {isGameStarted && (
            <div className="text-green-400 font-bold h-6 flex justify-center items-center mx-auto">
              <AnimatedNumber value={gamePoints} />
            </div>
          )}
          {/* <Link href={'/auth/login'}>
            <div className="">Gość</div>
          </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar
