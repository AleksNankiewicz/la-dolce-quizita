import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { quizProps } from '@/types/data'

const BigQuizBlock = ({
  title,
  slug,
  img,
  categoryName,
  categorySlug,
  desc,
}: {
  title: string
  slug: string
  img: string
  categoryName: string
  categorySlug: string
  desc: string
}) => {
  return (
    <Link
      href={`/quizes/${slug}`}
      className={`block text-black text-2xl   p4 col-span-2 md:col-span-4 w-full text-center h-[250px] sm:h-[250px] md:min-h-[300px] lg:min-h-[300px] rounded-xl relative group overflow-hidden  -py ${
        !img && 'bg-slate-800'
      }`}
    >
      <div className="w-full h-full md:flex gap-4">
        <div className="relative w-full h-full md:w-[400px] md:h-[300px] sm:h-[250px] flex flex-col gap-6">
          {typeof img === 'string' && img.trim() !== '' && (
            <Image
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              src={img}
              fill
              alt="background"
              className="overflow-hidden rounded-2xl opacity-40 group-hover:scale-125 md:group-hover:scale-100 duration-300 object-cover"
            />
          )}
        </div>

        <div className="hidden md:flex text-white w-1/2  flex-col items-start">
          <div className="lg:text-4xl md:text-3xl text-left">{title}</div>

          {categoryName && (
            <div className="lg:text-2xl md:text-xl">
              Kategoria:
              <span className="text-purple-400">{categoryName}</span>
            </div>
          )}
          <div className="text-sm lg:text-base text-left mt-5 ">{desc}</div>
        </div>

        <p
          className={`absolute md:hidden  max-w-full h-full top-1/2 left-1/2 -translate-x-[50%] -translate-y-[15%] text-4xl md:text-6xl text-white ${
            title.length > 20 && 'top-1/3'
          }`}
        >
          {title}
        </p>
      </div>
    </Link>
  )
}

export default BigQuizBlock
