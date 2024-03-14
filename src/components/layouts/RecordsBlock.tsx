import { getTopFiveUsers, getUsers } from '@/lib/actions'
import { formatNumber } from '@/lib/utils'
import { UserProps } from '@/types/data'
import { Coins, Flame } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const RecordsBlock = async () => {
  const users = await getTopFiveUsers()

  // users.sort((a, b) => b.points - a.points)
  // const noNewUsers = users.filter((user) => user.points)

  return (
    <div className="text-white  bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800  col-span-2 md:col-span-4 w-full text-center min-h-[90px] rounded-xl flex-col justify-center items-center px-2 py-1 divide-y divide-gray-600  ">
      {users.map((user: UserProps, i: number) => (
        <div
          key={i}
          className="flex text-sm  justify-between items-center py-2"
        >
          <div className="flex items-center gap-2">
            {' '}
            <div className="rounded-full w-12 h-12 relative flex justify-center items-center">
              <Image
                src={user?.img ? user?.img : '/noavatar.png'}
                alt="profilepic"
                width={50}
                height={50}
                className="rounded-full w-8 h-8"
              />

              {user?.selectedProfileFrame && (
                <Image
                  src={user.selectedProfileFrame}
                  alt="profilepic"
                  width={70}
                  height={70}
                  className=" absolute top-0 left-0 w-12 h-12"
                />
              )}
              <div className="absolute right-0 bottom-0 bg-white rounded-full w-4 h-4 text-xs text-center text-purple-700 font-bold border border-purple-700">
                <p className="">{user?.level ? user?.level : 1}</p>
              </div>
            </div>
            {user.selectedBadge && (
              <Image
                sizes="100vw"
                className="rounded-full w-6 h-6"
                src={user.selectedBadge}
                alt="avatar"
                width={20}
                height={20}
              />
            )}
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
          <div className="flex  sm:gap-3">
            {user.streak > 0 && (
              <div className="flex flex-col-reverse text-orange-500 w-10 sm:w-14 items-center">
                <p> {user?.streak}x</p>
                <Flame size={25} />
              </div>
            )}
            <div className="flex flex-col-reverse items-center w-10 sm:w-14">
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
