'use client'
import { categoryProps, quizProps } from '@/types/data'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import SmallQuizBlock from '../blocks/SmallQuizBlock'
import SmallCategoryBlock from '../blocks/SmallCategoryBlock'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import Link from 'next/link'

const HomeCategoriesSlider = ({
  categories,
}: {
  categories: categoryProps[]
}) => {
  const [preloadedImages, setPreloadedImages] = useState<string[]>([])

  useEffect(() => {
    // Preload images
    const imagesToPreload = categories.map((category: categoryProps) => {
      return typeof category.img === 'string' ? category.img : ''
    })

    const preloaded = imagesToPreload.filter(Boolean) as string[]

    setPreloadedImages(preloaded)
  }, [categories])
  const settings = {
    dots: false,
    // infinite: true,
    slidesToShow: 2,

    autoplay: true,
    speed: 7500,
    autoplaySpeed: 1,
    cssEase: 'linear',
    // pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 3000, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  }
  return (
    <div className="w-full col-span-2 md:col-span-4 relative ">
      <div className="absolute w-16 -left-2 top-0 h-full  bg-gradient-to-r from-slate-950 to-black/0  z-20"></div>
      <div className="absolute w-20 -right-2 top-0 h-full  bg-gradient-to-l from-slate-950 to-black/0  z-20"></div>

      <Marquee
        pauseOnHover
        pauseOnClick
        // gradient
        // gradientColor="#020617"
      >
        {categories.map((quiz: categoryProps) => (
          <Link
            key={quiz.title}
            href={`/mainCategories/${quiz.slug}`}
            className={`block text-2xl text-white mx-2 col-span-1 w-[200px] md:w-[250px]  h-[200px] sm:h-[240px] md:h-[200px] lg:h-[280px]  text-center gap-2 rounded-xl relative group overflow-hidden flex-col ${
              !quiz.img && 'bg-slate-800'
            }`}
          >
            {' '}
            <div className="w-full h-2/3 relative">
              {quiz.img && (
                <Image
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  blurDataURL={quiz.img}
                  placeholder="blur"
                  src={quiz.img}
                  fill
                  alt={quiz.title}
                  className="  group-hover:scale-125  duration-300 object-cover"
                />
              )}
            </div>
            {/* {title && <div className="w-full h-1/3 bg-slate-900 ">{title}</div>} */}
            {quiz.title && (
              <p
                className={`absolute h-[34%] w-full 
       bottom-0 left-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex justify-start items-center px-2 `}
              >
                {quiz.title}
              </p>
            )}
          </Link>
        ))}
      </Marquee>
    </div>
  )
}

export default HomeCategoriesSlider
