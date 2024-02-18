'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Timer } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Progress } from '../ui/progress'
import Link from 'next/link'
import { useGameStore } from '@/lib/store'
import { AnimatedNumber } from '../animations/AnimatedNumber'
import { motion } from 'framer-motion'
// import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const Navbar = () => {
  //Store
  const isGameStarted = useGameStore((state) => state.isGameStarted)

  const setIsGameStarted = useGameStore((state) => state.setIsGameStarted)

  const actualQuestionTime = useGameStore((state) => state.actualQuestionTime)

  const questionsNumber = useGameStore((state) => state.questionsNumber)

  const actualQuestionsNumber = useGameStore(
    (state) => state.actualQuestionsNumber
  )

  const gamePoints = useGameStore((state) => state.gamePoints)

  const [isUserLogged, setIsUserLogged] = useState(false)

  //if user is not on game page

  // useEffect(() => {
  //   // Update isGameStarted state only when the router is mounted
  //   if (router.pathname !== '/game') {
  //     setIsGameStarted(false)
  //     console.log(router.pathname)
  //   }
  // }, [router.pathname, setIsGameStarted])

  return (
    <div
      className={`w-full   text-white flex bg-purple-700 p-1 z-50 sticky left-0 top-0 ${
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
        } w-1/3 flex flex-col items-center justify-center gap-2 `}
      >
        {actualQuestionTime < 20 ? (
          <motion.div
            className="text-red-400"
            animate={{ rotateZ: [20, -20, 20] }}
            transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
          >
            <Timer />
          </motion.div>
        ) : (
          <Timer />
        )}
        <Progress
          value={actualQuestionTime}
          indicatorColor={
            actualQuestionTime < 20 ? 'bg-red-400' : 'bg-green-400'
          }
          className="h-2 "
        />
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
