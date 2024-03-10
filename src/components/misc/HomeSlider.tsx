'use client'
import {
  QuizesPlayedProps,
  UserProps,
  quizProps,
  sessionUserProps,
} from '@/types/data'
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import SmallQuizBlock from '../blocks/SmallQuizBlock'

import EditQuizButton from '../layouts/EditQuizButton'
import Image from 'next/image'
import Link from 'next/link'
import Marquee from 'react-fast-marquee'
import { formatNumber } from '@/lib/utils'
import { UserRound } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { getUserByEmail } from '@/lib/actions'
import SliderQuiz from './SliderQuiz'
import Loading from '@/app/loading'
import { ThreeDots } from 'react-loader-spinner'

const MarqueeWithLoading = ({
  children,
  loading,
}: {
  children: React.ReactNode
  loading: boolean
}) => {
  return loading ? (
    <div className="relative w-fu   mx-2 h-[180px] sm:h-[240px] md:h-[200px] lg:h-[280px] flex justify-center items-center ">
      <ThreeDots
        visible={true}
        height="40"
        width="40"
        color="white"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  ) : (
    <Marquee pauseOnHover pauseOnClick>
      {children}
    </Marquee>
  )
}

const HomeSlider = ({ quizes }: { quizes: quizProps[] }) => {
  const session = useSession()
  const [email, setEmail] = useState<string | undefined>()
  const [loading, setLoading] = useState(true)
  const fetchUser = async (email: string) => {
    const user: UserProps = await getUserByEmail(email)
    setEmail(user.email)
  }

  useEffect(() => {
    if (session.status == 'authenticated') {
      const user = session.data.user as sessionUserProps
      fetchUser(user.email)
    }
    setLoading(false)
  }, [session])

  return (
    <div className="w-full col-span-2 md:col-span-4 relative ">
      <div className="absolute w-16 -left-2 top-0 h-full  bg-gradient-to-r from-slate-950 to-black/0  z-20"></div>
      <div className="absolute w-20 -right-2 top-0 h-full  bg-gradient-to-l from-slate-950 to-black/0  z-20"></div>
      <MarqueeWithLoading loading={loading}>
        {quizes.map((quiz: quizProps) => (
          <SliderQuiz quiz={quiz} email={email} key={quiz.slug} />
        ))}
      </MarqueeWithLoading>
    </div>
  )
}

export default HomeSlider
