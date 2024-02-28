'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Timer } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Progress } from '../ui/progress'
import Link from 'next/link'
import { resetStore, useGameStore } from '@/lib/store'
import { AnimatedNumber } from '../animations/AnimatedNumber'
import { motion } from 'framer-motion'
// import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { sessionUserProps } from '@/types/data'
import UserImage from '../misc/UserImage'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import { ThreeDots } from 'react-loader-spinner'
const Navbar = () => {
  //session

  const pathname = usePathname()

  const session = useSession()
  // console.log(session)

  const [isUserLogged, setIsUserLogged] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => {
    if (session.status == 'loading') {
      setIsLoading(true)
    }
    if (session.status == 'unauthenticated') {
      setIsLoading(false)
    }

    if (session.status == 'authenticated') {
      setIsLoading(false)

      setIsUserLogged(true)
      const user = session.data.user as sessionUserProps

      setUsername(user.username)
      setEmail(user.email)
    }
  }, [session?.data, session?.status])

  //Store
  const isGameStarted = useGameStore((state) => state.isGameStarted)

  const setIsGameStarted = useGameStore((state) => state.setIsGameStarted)

  const actualQuestionTime = useGameStore((state) => state.actualQuestionTime)

  const questionsNumber = useGameStore((state) => state.questionsNumber)

  const actualQuestionsNumber = useGameStore(
    (state) => state.actualQuestionsNumber
  )

  const gamePoints = useGameStore((state) => state.gamePoints)

  useEffect(() => {
    // Do something here...

    if (!isGameStarted) return
    if (!pathname.includes('/game/')) {
      resetStore()
    }
  }, [pathname])

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
          QuizyMania
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
        } w-1/3 flex flex-col items-center justify-start gap-2 `}
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

      {!isLoading ? (
        <Link
          href={isUserLogged ? '/profile' : '/auth/login'}
          className="block w-1/3 ml-6 "
        >
          <div className="flex justify-center items-center gap-3 ">
            <UserImage email={email} />

            <div className="flex flex-col justify-end">
              <div className="">
                {isUserLogged ? (
                  <>
                    <p className="hidden md:block">{username}</p>
                    {username.length > 5 ? (
                      <p className="md:hidden">
                        {username.slice(0, 5)}
                        <span>...</span>
                      </p>
                    ) : (
                      <p className="md:hidden">{username}</p>
                    )}
                  </>
                ) : (
                  <>Zaloguj się</>
                )}
              </div>

              {isGameStarted && (
                <div className="text-green-400 font-bold h-6 flex justify-center items-center mx-auto">
                  <AnimatedNumber value={gamePoints} />
                </div>
              )}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex justify-center items-center gap-3 w-1/3 ml-6">
          <ThreeDots
            visible={true}
            height="40"
            width="40"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  )
}

export default Navbar
