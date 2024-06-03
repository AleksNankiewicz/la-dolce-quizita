'use client'
import { categoryProps, quizProps } from '@/types/data'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ThreeDots } from 'react-loader-spinner'
const HomeCategoriesSlider = ({
  categories,
}: {
  categories: categoryProps[]
}) => {
  const animation = { duration: 20000, easing: (t: number) => t }
  const [loading, setLoading] = useState(true)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    drag: true,
    mode: 'free',
    renderMode: 'performance',
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

        {categories.map((quiz: categoryProps, index: number) => (
          <div
            key={index}
            className="keen-slider__slide  relative  h-[150px] rounded-xl flex"
          >
            <Link
              href={`/mainCategories/${quiz.slug}`}
              className="w-full h-full"
            >
              <div className="w-full h-full relative ">
                {quiz.img && (
                  <Image
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    blurDataURL={quiz.img}
                    placeholder="blur"
                    src={quiz.img}
                    fill
                    alt={quiz.title}
                    className="  group-hover:scale-125  duration-300 object-cover brightness-[0.60]"
                  />
                )}
              </div>
              {quiz.title && (
                <p
                  className={`absolute  w-full
           bottom-2 left-2  flex justify-start items-center px-2 text-lg font-semibold text-white`}
                >
                  {quiz.title}
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeCategoriesSlider
