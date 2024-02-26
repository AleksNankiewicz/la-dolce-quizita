'use server'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import { AddQuizButton } from '@/components/layouts/addQuizButton'

import { getQuizesByCategories, getSubCategories } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'

const SingleMainCategoryPage = async ({ params }: any) => {
  const { slug } = params

  console.log(params)

  const mainCategories = await getQuizesByCategories(slug)

  console.log(mainCategories)
  return (
    <main className=" w-full p-4 grid grid-cols-2 md:grid-cols-4  gap-3 ">
      {mainCategories.map((mainCategory) => (
        <Link
          key={mainCategory.title}
          href={`/subCategories/${mainCategory.title}`}
          className={`block text-2xl text-white p4 col-span-1 w-full  h-[200px] sm:h-[240px] md:h-[200px] lg:h-[280px]  text-center gap-2 rounded-xl relative group overflow-hidden ${
            !mainCategory.img && 'bg-slate-800'
          }`}
        >
          {' '}
          {mainCategory.img && (
            <Image
              src={mainCategory.img}
              fill
              alt={mainCategory.title}
              className=" rounded-2xl opacity-40 group-hover:scale-125  duration-300"
            />
          )}
          <p
            className={`absolute  w-full h-full top-1/2 -translate-y-[15%]  text-white ${
              mainCategory?.title.length > 15 && 'top-1/3'
            }`}
          >
            {mainCategory.title}
          </p>
        </Link>
      ))}
    </main>
  )
}

export default SingleMainCategoryPage
