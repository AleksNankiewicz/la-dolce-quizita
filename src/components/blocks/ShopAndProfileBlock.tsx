'use client'
import React, { useEffect, useState } from 'react'
import {
  Award,
  CircleUserRound,
  Coins,
  CoinsIcon,
  Gamepad2,
  Store,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { LevelProps, UserProps, sessionUserProps } from '@/types/data'
import { formatNumber } from '@/lib/utils'
import { getLevels, getUserByEmail } from '@/lib/actions'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import Link from 'next/link'

const ShopAndProfileBlock = () => {
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
  return (
    <div className="text-white text-sm  p4 col-span-2 md:col-span-4 w-full text-center  rounded-xl  relative grid md:grid-cols-4 grid-cols-2 gap-3 ">
      {!isUserLogged && (
        <div className="absolute z-10 w-full h-full bg-black/90 left-0 top-0 flex justify-center items-center">
          Zaloguj się, aby zobaczyć Sklep i profil
        </div>
      )}
      <Link href={'/shop'} className="block col-span-2">
        <div className="flex flex-col  justify-center items-center border col-span-2  h-36 bg-gradient-to-br from-purple-500 via-purple-700 to-purple-900 rounded-xl relative hover:animate-pulse">
          <Store
            strokeWidth={1}
            className="w-1/2 md:w-1/3 lg:w-1/2 h-1/2 absolute right-0 bottom-1/2 translate-y-1/2 "
          />
          <div className="absolute left-[10%] top-1/4 text-left">
            <p className="sm:text-4xl text-3xl  ">Sklep</p>
            <p className="sm:text-xl">Kupuj odznaki i obramówki</p>
          </div>
        </div>
      </Link>
      <Link href={`/profile/${user?.slug}`} className="block col-span-2">
        <div className="flex flex-col  justify-center items-center  border col-span-2  h-36 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 rounded-xl relative">
          <CircleUserRound
            strokeWidth={1}
            className="w-1/2 md:w-1/3 lg:w-1/2 h-1/2 absolute right-0 bottom-1/2  translate-y-1/2"
          />
          <div className="absolute left-[10%] top-[20%] ">
            <p className="sm:text-4xl text-3xl  text-left">Profil</p>
            <p className="sm:text-xl ">Edytuj i przegladaj profil</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ShopAndProfileBlock
