import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import EditQuizButton from './EditQuizButton'

const QuizBlock = ({
  id,
  slug,
  img,
  title,
}: {
  id?: string
  slug?: string
  img: string
  title: string
}) => {
  console.log(slug)
  return (
    <Link
      key={id || title}
      href={`/quizes/${slug}`}
      className={`block text-2xl text-white p4 col-span-1 w-full  h-[200px] sm:h-[240px] md:h-[200px] lg:h-[280px]  text-center gap-2 rounded-xl relative group overflow-hidden ${
        !img && 'bg-slate-800'
      }`}
    >
      {' '}
      {/* {img && (
        <Image
          src={img}
          fill
          alt={title}
          className=" rounded-2xl opacity-40 group-hover:scale-125  duration-300"
        />
      )} */}
      <p
        className={`absolute  w-full h-full top-1/2 -translate-y-[15%]  text-white ${
          title.length > 28 && 'top-1/3'
        } `}
      >
        {title}
      </p>
      <EditQuizButton slug={slug ? slug : title} />
    </Link>
  )
}

export default QuizBlock
