import { getUsers } from '@/lib/actions'
import { formatNumber } from '@/lib/utils'
import { Coins, Flame } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const RecordsBlock = async () => {
  const users = await getUsers()

  users.sort((a, b) => b.points - a.points)
  const noNewUsers = users.filter((user) => user.points)

  return (
    <div className="text-white  bg-slate-800  col-span-2 md:col-span-4 w-full text-center min-h-[90px] rounded-xl flex-col justify-center items-center p-4  ">
      {noNewUsers.map((user, i) => (
        <div
          key={i}
          className="flex text-sm  justify-between items-center py-1"
        >
          <div className="flex items-center gap-2">
            {' '}
            <Image
              sizes="100vw"
              className="rounded-full w-10 h-10"
              src={user.img ? user.img : '/noavatar.png'}
              alt="avatar"
              width={25}
              height={25}
            />
            {user.username.length > 12 ? (
              <p className="sm:hidden">
                {user.username.slice(0, 12)}
                <span>...</span>
              </p>
            ) : (
              <p className="sm:hidden">{user.username}</p>
            )}
            <p className="hidden sm:block">{user.username}</p>
          </div>
          <div className="flex  gap-3">
            {user.streak > 0 && (
              <div className="flex flex-col-reverse text-orange-500 w-14 items-center">
                <p> {user?.streak}x</p>
                <Flame size={25} />
              </div>
            )}
            <div className="flex flex-col-reverse items-center  w-14">
              <p>{formatNumber(user.points)}</p>
              <Coins size={25} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecordsBlock
