import { UserProps } from '@/types/data'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const QuizAuthor = ({
  username,
  img,
  isVerified,
}: {
  username: string
  img: string | undefined
  isVerified: boolean
}) => {
  return (
    <div className="text-xs bg-slate-800 flex justify-evenly gap-2 items-center px-1 py-0.5 rounded-xl">
      {img && (
        <Image
          src={img}
          alt="profilepic"
          width={50}
          height={50}
          className="rounded-full w-4 h-4"
        />
      )}
      <p className="flex  items-center gap-1">
        {username}
        {isVerified && <BadgeCheck size={15} className="text-blue-400" />}
      </p>
    </div>
  )
}

export default QuizAuthor
