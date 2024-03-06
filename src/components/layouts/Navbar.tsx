'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { ArrowLeft, Coins, Timer } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Progress } from '../ui/progress'
import Link from 'next/link'
import useNavStore, { resetStore, useGameStore } from '@/lib/store'
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
import NavbarSearchbar from './NavbarSearchbar'
import UserBadge from '../misc/UserBadge'
import UserNavbar from '../misc/UserNavbar'

const includedRoutes = ['/', '/quizes', '/mainCategories', '/^/quizes/*/']

const Navbar = () => {
  //session

  const pathname = usePathname()

  const session = useSession()
  // console.log(session)
  const router = useRouter()
  const [isUserLogged, setIsUserLogged] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [slug, setSlug] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
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
      setSlug(user.slug)
      setIsAdmin(user.isAdmin)
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
    // setActualQuestionsNumber(1)

    if (session.status === 'unauthenticated' && pathname.includes('/admin')) {
      router.push('/')
    }

    if (!isUserLogged && isUserLogged) {
      if (pathname.includes('/admin') && !isAdmin) {
        router.push('/')
      }
    }
    if (!isGameStarted) return
    if (!pathname.includes('/game/')) {
      resetStore()
    }
  }, [pathname, isUserLogged, isAdmin, isLoading, session.status])

  return (
    <div
      className={`w-full min-h-12   text-white flex bg-purple-700 p-1 z-50 sticky left-0 top-0 ${
        isGameStarted ? 'justify-center' : 'justify-between'
      }  items-center rounded-b-xl`}
    >
      <div
        className={`${
          isGameStarted ? 'hidden' : 'flex'
        }  w-1/3 justify-start font-bold text-center`}
      >
        <Link href={'/'} className="pl-3 text-xl">
          QuizyMania
        </Link>
      </div>

      <div
        className={`${
          (!isGameStarted && pathname.includes('/quizes')) ||
          pathname.includes('/mainCategories') ||
          pathname == '/'
            ? 'flex'
            : 'hidden'
        }  w-3/5  md:w-[70%] md:justify-center  `}
      >
        <NavbarSearchbar />
      </div>

      <div
        className={`${
          isGameStarted ? 'flex' : 'hidden'
        }  w-1/3 justify-start font-bold text-center pl-3`}
      >
        <Link href={'/'} className="block">
          <ArrowLeft strokeWidth={3} />
        </Link>
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
          href={isUserLogged ? `/profile/${slug}` : '/auth/login'}
          className="block w-[25%] ml-6 "
        >
          <div className="flex flex-row-reverse justify-center items-center gap-3 ">
            {isUserLogged && <UserNavbar email={email} />}

            {/* <UserBadge email={email} /> */}
            <div className="flex justify-end">
              <div className="">
                {isUserLogged ? (
                  <>
                    {/* <p className="hidden md:block">{username}</p>
                    {username.length > 5 ? (
                      <p className="md:hidden">
                        {username.slice(0, 5)}
                        <span>...</span>
                      </p>
                    ) : (
                      <p className="md:hidden">{username}</p>
                    )} */}
                  </>
                ) : (
                  <div
                    className={`${
                      isGameStarted && 'hidden '
                    } whitespace-nowrap `}
                  >
                    Zaloguj się
                  </div>
                )}
              </div>

              {isGameStarted && (
                <div className="text-green-400 font-bold h-6 flex justify-center items-center mx-auto">
                  <AnimatedNumber value={gamePoints} />

                  <span className="text-white ml-1">
                    <Coins size={14} />
                  </span>
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
