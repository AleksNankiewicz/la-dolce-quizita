import HomeQuizSectionLabel from '@/components/atoms/HomeQuizSectionLabel'

import {
  getNewestQuizes,
  getPopularQuizes,
  getRandomSubCategories,
} from '@/lib/actions'

import HomeSlider from '@/components/misc/HomeSlider'
import HomeCategoriesSlider from '@/components/misc/HomeCategoriesSlider'
import { db } from '@/lib/db'
import { Question } from '@/lib/models'
import HomeNavbar from '@/components/pages/home/HomeNavbar'

export default async function Home() {
  const quizes = await db.quiz.findMany({
    take: 10,
    include: {
      questions: true,
    },
  })
  const newestQuizes = await getNewestQuizes(8)
  const subCategories = await getRandomSubCategories(8)

  return (
    <>
      <HomeNavbar />
      <main className=" w-full  grid grid-cols-2 gap-3 md:grid-cols-4">
        {/* <HomeQuizSectionLabel title={'Najpopularniejsze wyzwanie'} /> */}
        {/* <BigQuizBlock
        slug={quizes[0].slug}
        title={quizes[0].title}
        desc={quizes[0].desc}
        img={quizes[0].img}
        categorySlug={quizes[0].categorySlug}
        categoryName={quizes[0].categoryName}
      /> */}
        <HomeQuizSectionLabel title={'Wybrane Quizy'} seeMoreLink="/" />

        <HomeSlider quizes={quizes} />

        <HomeQuizSectionLabel title={'Najnowsze Quizy'} />

        <HomeSlider quizes={newestQuizes} />

        <HomeQuizSectionLabel title={'Kategorie'} />
        <HomeCategoriesSlider categories={subCategories} />

        <HomeQuizSectionLabel title="Najlepsi gracze" />
      </main>
    </>
  )
}
