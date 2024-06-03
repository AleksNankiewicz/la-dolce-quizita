'use client'
import {
  QuizesPlayedProps,
  UserProps,
  quizProps,
  sessionUserProps,
} from '@/types/data'
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import SmallQuizBlock from '../layouts/blocks/SmallQuizBlock'

import EditQuizButton from '../layouts/EditQuizButton'
import Image from 'next/image'
import Link from 'next/link'
//import Marquee from 'react-fast-marquee'
import { formatNumber } from '@/lib/utils'
import { UserRound } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { getUserByEmail } from '@/lib/actions'
import SliderQuiz from './SliderQuiz'
import Loading from '@/app/loading'
import { ThreeDots } from 'react-loader-spinner'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { QuizWithQuestions } from '@/types/extended'

const HomeSlider = ({ quizes }: { quizes: QuizWithQuestions[] }) => {
  const [email, setEmail] = useState<string | undefined>()

  const animation = { duration: 20000, easing: (t: number) => t }
  const [loading, setLoading] = useState(true)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    drag: true,
    mode: 'free',
    renderMode: 'precision',

    breakpoints: {
      '(min-width: 768px)': {
        slides: {
          perView: 4,
          spacing: 13,
        },
      },
    },
    slides: {
      perView: 2,
      spacing: 13,
    },

    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
  })

  useEffect(() => {
    setLoading(false)
  }, [loading])

  if (loading) {
    return (
      <div className="relative w-full mx-2 h-[180px] sm:h-[240px] md:h-[200px] lg:h-[280px] flex justify-center items-center md:col-span-4 col-span-2">
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
    )
  }

  return (
    <div className="w-full col-span-2 md:col-span-4">
      <div ref={sliderRef} className="keen-slider ">
        <div className="absolute w-16 -left-2 top-0 h-full  bg-gradient-to-r from-slate-950 to-black/0  z-20"></div>
        <div className="absolute w-20 -right-2 top-0 h-full  bg-gradient-to-l from-slate-950 to-black/0  z-20"></div>

        {quizes.map((quiz: QuizWithQuestions) => (
          <SliderQuiz quiz={quiz} email={email} key={quiz.slug} />
        ))}
      </div>
    </div>
  )
}

export default HomeSlider
