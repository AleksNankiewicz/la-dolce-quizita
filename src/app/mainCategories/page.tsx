'use server'
import SmallCategoryBlock from '@/components/blocks/SmallCategoryBlock'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import { AddQuizButton } from '@/components/layouts/addQuizButton'

import { getSubCategories } from '@/lib/actions'
import { categoryProps } from '@/types/data'
import Image from 'next/image'
import Link from 'next/link'

const mainCategoriesPage = async () => {
  const categories = await getSubCategories()

  return (
    <main className=" w-full p-4 grid grid-cols-2 md:grid-cols-4  gap-3 ">
      {categories.map((category: categoryProps) => (
        <SmallCategoryBlock
          title={category.title}
          slug={category.slug}
          img={category.img}
        />
      ))}
    </main>
  )
}

export default mainCategoriesPage
