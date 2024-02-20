'use client'
import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const QuizBlock = ({
  label,
  slug,
  img,
  title,
}: {
  label: string
  slug: string
  img: string
  title: string
}) => {
  console.log(img)
  return (
    <Link
      key={label}
      href={`/quizes/${slug}`}
      className="block text-2xl text-white p4 col-span-1 w-full  h-[150px] sm:h-[200px] md:h-[300px] lg:h-[500px]  text-center gap-2 rounded-xl relative group overflow-hidden"
    >
      {' '}
      <Image
        src={img}
        fill
        alt={title}
        className=" rounded-2xl opacity-40 group-hover:scale-125  duration-300"
      />
      <p className="absolute  w-full h-full top-1/2 -translate-y-[15%]  text-white">
        {title}
      </p>
    </Link>
  )
}

export default QuizBlock
