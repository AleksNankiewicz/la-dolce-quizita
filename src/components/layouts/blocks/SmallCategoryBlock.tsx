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
      className={`block text-2xl text-white p4 col-span-1 w-full  h-[200px] sm:h-[240px] md:h-[200px] lg:h-[280px]  text-center gap-2 rounded-xl relative group overflow-hidden flex-col ${
        !img && 'bg-slate-800'
      }`}
    >
      {' '}
      <div className="w-full h-2/3 relative">
        {img && (
          <Image
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            blurDataURL={img}
            placeholder="blur"
            src={img}
            fill
            alt={title}
            className="  group-hover:scale-125  duration-300 object-cover"
          />
        )}
      </div>
      {/* {title && <div className="w-full h-1/3 bg-slate-900 ">{title}</div>} */}
      {title && (
        <p
          className={`absolute h-[34%] w-full 
         bottom-0 left-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex justify-start items-center px-2 `}
        >
          {title}
        </p>
      )}
    </Link>
  )
}

export default SmallCategoryBlock
