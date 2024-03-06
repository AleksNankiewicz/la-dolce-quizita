'use server'
import SmallQuizBlock from '@/components/blocks/SmallQuizBlock'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import { AddQuizButton } from '@/components/layouts/addQuizButton'

import { getQuizesByCategories, getSubCategories } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'

const SinglequizPage = async ({ params }: any) => {
  const { slug } = params

  console.log(params)

  const quizes = await getQuizesByCategories(slug)

  console.log(quizes)
  return (
    <main className=" w-full p-4 grid grid-cols-2 md:grid-cols-4  gap-3 ">
      {quizes.map((quiz) => (
        <SmallQuizBlock
          slug={quiz.slug}
          img={quiz.img}
          title={quiz.title}
          categorySlug={quiz.categorySlug}
          author={quiz.author}
          key={quiz._id}
        />
      ))}
    </main>
  )
}

export default SinglequizPage
