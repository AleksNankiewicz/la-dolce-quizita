'use client'
import React, { useEffect, useState } from 'react'
import { Award, Coins, CoinsIcon, Gamepad2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { LevelProps, UserProps, sessionUserProps } from '@/types/data'
import { formatNumber } from '@/lib/utils'
import { getLevels, getUserByEmail } from '@/lib/actions'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
const StatsBlock = () => {
  const session = useSession()

  const [isUserLogged, setIsUserLogged] = useState(false)

  const [email, setEmail] = useState('')

  useEffect(() => {
    if (session.status == 'authenticated') {
      setIsUserLogged(true)
      const user = session.data.user as sessionUserProps
      setEmail(user.email ?? null)
    }
  }, [session?.data, session?.status])

  const [user, setUser] = React.useState<UserProps>()
  const [levels, setLevels] = useState<LevelProps[]>([])
  const [nearestLevel, setNearestLevel] = useState<number>()
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByEmail(email)
        const levels = await getLevels()
        setUser(user)
        setLevels(levels)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [email])

  useEffect(() => {
    if (levels.length === 0 || !user) return // Don't proceed if levels are not available or user is null

    const nearest = levels.reduce(
      (nearestLevel: LevelProps | null, currentLevel) => {
        if (
          currentLevel.threshold > user.points &&
          (!nearestLevel || currentLevel.threshold < nearestLevel.threshold)
        ) {
          return currentLevel
        } else {
          return nearestLevel
        }
      },
      null
    )
    let missingPercentage = 0
    if (nearest) {
      missingPercentage = (nearest.threshold - user.points) / nearest.threshold
    }

    setNearestLevel(missingPercentage)
  }, [user, levels])

  return (
    <div className="text-white text-sm  p4 col-span-2 md:col-span-4 w-full text-center  rounded-xl  relative grid md:grid-cols-4 grid-cols-2 gap-3 ">
      {!isUserLogged && (
        <div className="absolute z-10 w-full h-full bg-black/90 left-0 top-0 flex justify-center items-center">
          Zaloguj się, aby zobaczyć statystyki
        </div>
      )}
      <div className="flex flex-col  justify-center items-center border col-span-1  h-36 bg-slate-800 rounded-xl relative">
        <Award
          strokeWidth={1}
          className="w-1/2 md:w-1/3 lg:w-1/2 h-1/2 absolute right-0 bottom-0 lg:bottom-1/2 lg:translate-y-1/2 -rotate-45 lg:rotate-0"
        />
        <div className="absolute left-[10%] top-1/4 ">
          <p className="sm:text-4xl text-3xl ">
            {user?.gameWon && formatNumber(user?.gameWon)}
          </p>
          <p className="sm:text-xl">Wygranych</p>
        </div>
      </div>
      <div className="flex flex-col  justify-center items-center  border col-span-1  h-36 bg-slate-800 rounded-xl relative">
        <Gamepad2
          strokeWidth={1}
          className="w-1/2 md:w-1/3 lg:w-1/2 h-1/2 absolute right-0 bottom-0 lg:bottom-1/2 lg:translate-y-1/2 -rotate-45 lg:rotate-0"
        />
        <div className="absolute left-[10%] top-[20%] ">
          <p className="sm:text-4xl text-3xl  w-1/2">
            {user?.gamePlayed && formatNumber(user?.gamePlayed)}
          </p>
          <p className="sm:text-xl w-1/2">Rozegranych quizów</p>
        </div>
      </div>
      <div className="flex flex-col  justify-center items-center border col-span-1  h-36 bg-slate-800 rounded-xl relative">
        <Coins
          strokeWidth={1}
          className="w-1/2 md:w-1/3 lg:w-1/2 h-1/2 absolute right-0 bottom-0 lg:bottom-1/2 lg:translate-y-1/2 -rotate-45 lg:rotate-0"
        />
        <div className="absolute left-[10%] top-1/4  ">
          <p className="sm:text-4xl text-3xl ">
            {user?.points && formatNumber(user?.points)}
          </p>
          <p className="sm:text-xl ">Punktów</p>
        </div>
      </div>
      <div className="flex flex-col  justify-center items-center border col-span-1  h-36 bg-slate-800 rounded-xl relative">
        <div className="w-1/3 md:w-1/3 lg:w-1/3 h-1/2 absolute right-3 bottom-3 lg:bottom-1/2 lg:translate-y-1/2 sm:bottom-14 md:bottom-3 text-5xl">
          {nearestLevel && (
            <CircularProgressbar
              value={nearestLevel}
              maxValue={1}
              text={`${nearestLevel * 100}%`}
              styles={buildStyles({
                pathColor: `#7e22ce`,
                textColor: `white`,
                trailColor: `white`,
              })}
            />
          )}
        </div>
        <div className="absolute left-[10%] top-1/4  ">
          <p className="sm:text-4xl text-3xl ">
            {user?.level && formatNumber(user?.level)}
          </p>
          <p className="sm:text-xl">Poziom</p>
        </div>
      </div>
    </div>
  )
}

export default StatsBlock
