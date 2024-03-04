import HomeQuizSectionLabel from '@/components/atoms/HomeQuizSectionLabel'
import HomeSeeAll from '@/components/atoms/HomeSeeAll'
import CardWrapper from '@/components/auth/CardWrapper'
import LoginForm from '@/components/auth/LoginForm'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import GameRecordsBlock from '@/components/layouts/GameRecordsBlock'
import RecordsBlock from '@/components/layouts/RecordsBlock'
import SmallQuizBlock from '@/components/blocks/SmallQuizBlock'
import StatsBlock from '@/components/layouts/StatsBlock'
import { AddQuizButton } from '@/components/layouts/addQuizButton'
import { Button } from '@/components/ui/button'
import {
  getQuizes,
  getRandomSubCategories,
  getSubCategories,
} from '@/lib/actions'
import { recordProps } from '@/types/data'
import { Award, Coins, CoinsIcon, Gamepad2 } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import BigQuizBlock from '@/components/blocks/BigQuizBlock'
import SmallCategoryBlock from '@/components/blocks/SmallCategoryBlock'

export default async function Home() {
  const quizes = await getQuizes(9)

  const subCategories = await getRandomSubCategories(4)

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      <HomeQuizSectionLabel title={'Najpopularniejsze wyzwanie'} />
      <BigQuizBlock
        slug={quizes[0].slug}
        title={quizes[0].title}
        desc={quizes[0].desc}
        img={quizes[0].img}
        categorySlug={quizes[0].categorySlug}
        categoryName={quizes[0].categoryName}
      />
      <HomeQuizSectionLabel title={'Wybrane Quizy'} />

      {quizes.slice(1).map((quiz) => (
        <SmallQuizBlock
          slug={quiz.slug}
          img={quiz.img}
          title={quiz.title}
          categorySlug={quiz.categorySlug}
          author={quiz.author}
          key={quiz._id}
        />
      ))}
      <AddQuizButton />
      <HomeSeeAll path="/quizes" label="Zobacz wszystkie" />
      <HomeQuizSectionLabel title={'Kategorie'} />
      {subCategories.map((category) => (
        <SmallCategoryBlock
          title={category.title}
          img={category.img}
          slug={category.slug}
          key={category._id || category.slug}
        />
      ))}
      <HomeSeeAll path="/mainCategories" label="Zobacz wszystkie" />

      <HomeQuizSectionLabel title="Statystyki" />
      <StatsBlock />
      <HomeQuizSectionLabel title="Najlepsi gracze" />

      <RecordsBlock />
    </main>
  )
}
