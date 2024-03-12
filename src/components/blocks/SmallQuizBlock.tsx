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
  return (
    <div className="relative w-full h-[180px] sm:h-[240px] md:h-[200px] lg:h-[280px] flex justify-center items-center">
      <Link
        href={`/quizes/${slug}`}
        className={`block text-2xl text-white p4 col-span-1 w-full h-full   text-center gap-2 rounded-xl relative group overflow-hidden flex-col${
          !img && 'bg-slate-800'
        }`}
      >
        <div className="w-full h-2/3 relative">
          {img && (
            <Image
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              blurDataURL={img}
              placeholder="blur"
              src={img}
              fill
              alt={title}
              className="   group-hover:scale-125  duration-300 object-cover"
            />
          )}
        </div>
        {/* {title && <div className="w-full h-1/3 bg-slate-900 ">{title}</div>} */}
        {title && (
          <div
            className={`absolute h-[34%] w-full 
         bottom-0 left-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex justify-start items-center px-2 text-base text-left`}
          >
            <p className="hidden md:block">{title}</p>
            <p className={`md:hidden block ${title.length > 20 && 'text-xs'}`}>
              {title}
            </p>
          </div>
        )}
      </Link>
      {/* <EditQuizButton
        slug={slug}
        categorySlug={categorySlug}
        quizAuthor={author}
      /> */}
    </div>
  )
}

export default SmallQuizBlock
