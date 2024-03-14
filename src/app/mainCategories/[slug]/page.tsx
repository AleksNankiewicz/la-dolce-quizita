'use server'
import SmallQuizBlock from '@/components/blocks/SmallQuizBlock'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import { AddQuizButton } from '@/components/layouts/addQuizButton'
import QuizesPage from '@/components/pages/QuizesPage'

import { getQuizesByCategories, getSubCategories } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'

const SinglequizPage = async ({ params }: any) => {
  const { slug } = params

  console.log(params)

  const quizes = await getQuizesByCategories(slug)

  console.log(quizes)
  return <QuizesPage quizes={quizes} />
}

export default SinglequizPage
