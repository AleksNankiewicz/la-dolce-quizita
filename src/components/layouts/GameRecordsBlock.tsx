import { getUserByEmail } from '@/lib/actions'
import { recordProps } from '@/types/data'
import { Coins } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const GameRecordsBlock = async ({
  record,
  quizMaxPoints,
}: {
  record: recordProps
  quizMaxPoints: number
}) => {
  const { email, score } = record

  const user = await getUserByEmail(email)

  return (
    <div className="flex text-sm  justify-between items-center py-2">
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
        {user?.selectedBadge && (
          <Image
            sizes="100vw"
            className="rounded-full w-6 h-6"
            src={user.selectedBadge}
            alt="avatar"
            width={20}
            height={20}
          />
        )}
        <p>{user?.username}</p>
      </div>

      <div className="flex flex-col-reverse">
        {quizMaxPoints <= score ? (
          <>
            <p className="text-green-400">Max</p>
            <Coins size={25} className="text-green-400" />
          </>
        ) : (
          <>
            <p>{score}</p>
            <Coins size={25} />
          </>
        )}
      </div>
    </div>
  )
}

export default GameRecordsBlock
