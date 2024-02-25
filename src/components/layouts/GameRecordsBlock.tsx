import { getUserByEmail } from '@/lib/actions'
import { recordProps } from '@/types/data'
import { Coins } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const GameRecordsBlock = async ({ record }: { record: recordProps }) => {
  const { email, score } = record

  const user = await getUserByEmail(email)

  return (
    <div className="flex text-sm  justify-between items-center py-1">
      <div className="flex items-center gap-2">
        {' '}
        <Image
          className="rounded-full w-10 h-10"
          src={user?.img ? user.img : '/noavatar.png'}
          alt="avatar"
          width={25}
          height={25}
        />
        <p>{user?.username}</p>
      </div>

      <div className="flex flex-col-reverse">
        <p>{score}</p>
        <Coins size={25} />
      </div>
    </div>
  )
}

export default GameRecordsBlock
