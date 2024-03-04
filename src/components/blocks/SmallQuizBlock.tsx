import Image from 'next/image'
import React from 'react'
import EditQuizButton from '../layouts/EditQuizButton'
import Link from 'next/link'

const SmallQuizBlock = ({
  id,
  slug,
  img,
  title,
  categorySlug,
  author,
}: {
  id?: string
  slug: string
  img: string
  title: string
  categorySlug: string
  author: string
}) => {
  console.log(slug)
  return (
    <div className="relative w-full h-[180px] sm:h-[240px] md:h-[200px] lg:h-[280px] flex justify-center items-center">
      <Link
        href={`/quizes/${slug}`}
        className={`block text-2xl text-white p4 col-span-1 w-full h-full   text-center gap-2 rounded-xl relative group overflow-hidden ${
          !img && 'bg-slate-800'
        }`}
      >
        {' '}
        {img && (
          <Image
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            src={img}
            fill
            alt={title}
            className=" rounded-2xl opacity-30 group-hover:scale-125  duration-300 object-cover"
          />
        )}
        <p
          className={`absolute  w-full h-full top-1/2 -translate-y-[15%]   text-white ${
            title?.length > 28 && 'top-1/3'
          } `}
        >
          {title}
        </p>
      </Link>
      <EditQuizButton
        slug={slug}
        categorySlug={categorySlug}
        quizAuthor={author}
      />
    </div>
  )
}

export default SmallQuizBlock
