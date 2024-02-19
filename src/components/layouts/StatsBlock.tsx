'use client'
import React, { useEffect, useState } from 'react'
import { Award, Coins, CoinsIcon, Gamepad2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { sessionUserProps } from '@/types/data'

const StatsBlock = () => {
  const session = useSession()

  const [isUserLogged, setIsUserLogged] = useState(false)

  const [wins, setWins] = useState(0)
  const [playedGames, setPlayedGames] = useState(0)
  const [points, setPoints] = useState(0)

  useEffect(() => {
    if (session.status == 'authenticated') {
      setIsUserLogged(true)
      const user = session.data.user as sessionUserProps
      setWins(user.gameWon ?? null)
      setPlayedGames(user.gamePlayed ?? null)
      setPoints(user.points ?? null)
    }
  }, [session?.data, session?.status])

  return (
    <div className="text-white text-sm bg-purple-600 p4 col-span-2 w-full text-center h-[100px] rounded-xl flex justify-evenly items-center relative">
      {!isUserLogged && (
        <div className="absolute w-full h-full bg-black/90 left-0 top-0 flex justify-center items-center">
          Zaloguj się aby zobaczyć statystyki
        </div>
      )}
      <div className="flex flex-col  justify-center items-center">
        <Award size={30} />
        <p className=" border-b-[2px] border-white">Wygrane</p>
        <p>{wins}</p>
      </div>
      <div className="flex flex-col  justify-center items-center">
        <Gamepad2 size={30} />
        <p className=" border-b-[2px] border-white">Rozegrane quizy</p>
        <p>{playedGames}</p>
      </div>
      <div className="flex flex-col  justify-center items-center">
        <Coins size={30} />
        <p className=" border-b-[2px] border-white">Ilość punktów</p>
        <p
          className="
          "
        >
          {points}
        </p>
      </div>
    </div>
  )
}

export default StatsBlock
