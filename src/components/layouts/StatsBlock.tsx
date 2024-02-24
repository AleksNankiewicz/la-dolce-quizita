'use client'
import React, { useEffect, useState } from 'react'
import { Award, Coins, CoinsIcon, Gamepad2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { sessionUserProps } from '@/types/data'
import { formatNumber } from '@/lib/utils'
import { getUserByEmail } from '@/lib/actions'

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

  const [user, setUser] = React.useState<sessionUserProps>()

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByEmail(email)
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [email])

  return (
    user && (
      <div className="text-white text-sm bg-purple-600 p4 col-span-2 w-full text-center h-[100px] rounded-xl flex justify-evenly items-center relative">
        {!isUserLogged && (
          <div className="absolute w-full h-full bg-black/90 left-0 top-0 flex justify-center items-center">
            Zaloguj się aby zobaczyć statystyki
          </div>
        )}
        <div className="flex flex-col  justify-center items-center">
          <Award size={30} />
          <p className=" border-b-[2px] border-white">Wygrane</p>
          <p>{user.gameWon}</p>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <Gamepad2 size={30} />
          <p className=" border-b-[2px] border-white">Rozegrane quizy</p>
          <p>{user.gamePlayed}</p>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <Coins size={30} />
          <p className=" border-b-[2px] border-white">Ilość punktów</p>
          <p
            className="
          "
          >
            {formatNumber(user.points)}
          </p>
        </div>
      </div>
    )
  )
}

export default StatsBlock
