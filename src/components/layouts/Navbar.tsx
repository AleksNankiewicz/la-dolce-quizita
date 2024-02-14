'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Timer } from 'lucide-react'
import React, { useState } from 'react'
import { Progress } from '../ui/progress'
import Link from 'next/link'

const Navbar = () => {
  const [isGameStart, setIsGameStart] = useState(false)

  const [isUserLogged, setIsUserLogged] = useState(false)

  return (
    <div
      className={`w-full   text-white flex bg-purple-700 p-4 ${
        isGameStart ? 'justify-center' : 'justify-end'
      }  items-center rounded-b-xl`}
    >
      <div
        className={`${
          isGameStart ? 'hidden' : 'flex'
        }  w-2/3 justify-start font-bold text-center`}
      >
        <Link href={'/'} className="pl-3 text-xl">
          La Dolce Quzita
        </Link>
      </div>
      <div
        className={`${
          isGameStart ? 'flex' : 'hidden'
        }  w-1/3 justify-start font-bold text-center`}
      >
        <p className="pl-3">0/14</p>
      </div>

      <div
        className={`${
          isGameStart ? 'flex' : 'hidden'
        }  w-1/3 justify-start font-bold text-center`}
      >
        <p className="pl-3">0/14</p>
      </div>
      <div
        className={`${
          isGameStart ? 'flex' : 'hidden'
        } w-1/3 flex flex-col items-center justify-center gap-2`}
      >
        <Timer />
        <Progress value={33} className="h-2" />
      </div>
      <div className="flex justify-center items-center gap-3 w-1/3 ml-6">
        <Avatar>
          <AvatarImage
            className="rounded-full w-10 h-10"
            src="/noavatar.png"
            alt="avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-end">
          {isUserLogged ? (
            <>
              <div className="">Alex N</div>
              <div className="text-green-400 font-bold">180</div>
            </>
          ) : (
            <Link href={'/auth/login'}>
              <div className="">Zaloguj</div>
              <div className="text-center">się</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
