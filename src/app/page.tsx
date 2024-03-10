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
  getNewestQuizes,
  getPopularQuizes,
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
import ShopAndProfileBlock from '@/components/blocks/ShopAndProfileBlock'
import HomeSlider from '@/components/misc/HomeSlider'
import HomeCategoriesSlider from '@/components/misc/HomeCategoriesSlider'

export default async function Home() {
  const quizes = await getPopularQuizes(8)
  const newestQuizes = await getNewestQuizes(8)
  const subCategories = await getRandomSubCategories(8)

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

      <HomeSlider quizes={quizes} />
      <AddQuizButton isWide={true} />
      <HomeSeeAll path="/quizes" label="Zobacz wszystkie" />
      <HomeQuizSectionLabel title="Statystyki" />
      <StatsBlock />
      <HomeQuizSectionLabel title={'Najnowsze Quizy'} />

      <HomeSlider quizes={newestQuizes} />

      <HomeQuizSectionLabel title="Sklep i Profil" />
      <ShopAndProfileBlock />

      <HomeQuizSectionLabel title={'Kategorie'} />
      <HomeCategoriesSlider categories={subCategories} />
      <HomeSeeAll path="/mainCategories" label="Zobacz wszystkie" />

      <HomeQuizSectionLabel title="Najlepsi gracze" />

      <RecordsBlock />
    </main>
  )
}
