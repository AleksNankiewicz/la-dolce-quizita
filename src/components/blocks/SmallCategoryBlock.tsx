import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SmallCategoryBlock = ({
  title,
  slug,
  img,
}: {
  title: string
  slug: string
  img: string
}) => {
  return (
    <Link
      key={title}
      href={`/mainCategories/${slug}`}
      className={`block text-2xl text-white p4 col-span-1 w-full  h-[200px] sm:h-[240px] md:h-[200px] lg:h-[280px]  text-center gap-2 rounded-xl relative group overflow-hidden ${
        !img && 'bg-slate-800'
      }`}
    >
      {' '}
      {img && (
        <Image
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          blurDataURL={img}
          placeholder="blur"
          src={img}
          fill
          alt={title}
          className=" rounded-2xl opacity-40 group-hover:scale-125  duration-300 object-cover"
        />
      )}
      {title && (
        <p
          className={`absolute  w-full h-full top-1/2 -translate-y-[15%]  text-white ${
            title.length > 28 && 'top-1/3'
          } `}
        >
          {title}
        </p>
      )}
    </Link>
  )
}

export default SmallCategoryBlock
