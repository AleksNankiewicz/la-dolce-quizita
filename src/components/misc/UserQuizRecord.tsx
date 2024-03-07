'use client'
import { getUserByEmail } from '@/lib/actions'
import { formatNumber } from '@/lib/utils'
import { recordProps, sessionUserProps } from '@/types/data'
import { CheckCircle2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { space } from 'postcss/lib/list'
import React, { useEffect, useState } from 'react'

const UserQuizRecord = ({
  records,
  quizMaxPoints,
}: {
  records: recordProps[]
  quizMaxPoints: number
}) => {
  const session = useSession()
  const [record, setRecord] = useState<recordProps>()

  const fetchUser = async (email: string) => {
    const user = await getUserByEmail(email)

    const rec = records.find(
      (record: recordProps) => record.email == user.email
    )
    if (rec) {
      setRecord(rec)
    }
  }

  useEffect(() => {
    if (session.status == 'authenticated') {
      const user = session.data.user as sessionUserProps
      fetchUser(user.email)
    }
  }, [session])

  if (!record) return

  return record?.score == quizMaxPoints ? (
    <CheckCircle2 size={30} className="mr-5 text-green-400" />
  ) : (
    <div className="bg-slate-800 text-xs md:text-sm px-1 py-1 rounded-xl text-center">
      <p>
        Twój rekord:
        <span className="text-sm text-purple-500">
          {' '}
          {formatNumber(record?.score)}
        </span>
      </p>
    </div>
  )
}

export default UserQuizRecord
