import HomeQuizSectionLabel from '@/components/atoms/HomeQuizSectionLabel'
import HomeSeeAll from '@/components/atoms/HomeSeeAll'
import CardWrapper from '@/components/auth/CardWrapper'
import LoginForm from '@/components/auth/LoginForm'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import GameRecordsBlock from '@/components/layouts/GameRecordsBlock'
import RecordsBlock from '@/components/layouts/RecordsBlock'
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

export default async function Home() {
  const quizes = await getQuizes(9)

  const subCategories = await getRandomSubCategories(4)

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      <HomeQuizSectionLabel title={'Najpopularniejsze wyzwanie'} />
      <Link
        href={`/quizes/${quizes[0].slug}`}
        className={`block text-black text-2xl   p4 col-span-2 md:col-span-4 w-full text-center h-[250px] sm:h-[250px] md:h-[350px] lg:h-[400px] rounded-xl relative group overflow-hidden md:pointer-events-none ${
          !quizes[0].img && 'bg-slate-800'
        }`}
      >
        <div className="w-full h-full md:flex gap-4">
          <div className="relative w-full h-full md:w-[400px] md:h-[300px] sm:h-[250px] flex flex-col gap-6">
            {quizes[0].img && (
              <Image
                src={quizes[0].img}
                fill
                alt="background"
                className="overflow-hidden rounded-2xl opacity-40 group-hover:scale-125 md:group-hover:scale-100 duration-300"
              />
            )}
            <Button
              className="
            block pointer-events-auto mt-[80%] bg-purple-600 hover:bg-purple-500"
            >
              Graj
            </Button>
          </div>

          <div className="hidden md:flex text-white w-1/2  flex-col items-start">
            <div className="text-4xl text-left">{quizes[0].title}</div>

            {quizes[0].categoryName && (
              <div className="text-2xl">
                Kategoria:
                <span className="text-purple-400">
                  {quizes[0].categoryName}
                </span>
              </div>
            )}
            <div className="text-sm text-left mt-5">{quizes[0].desc}</div>
          </div>

          <p
            className={`absolute md:hidden  max-w-full h-full top-1/2 left-1/2 -translate-x-[50%] -translate-y-[15%] text-4xl md:text-6xl text-white ${
              quizes[0].title.length > 20 && 'top-1/3'
            }`}
          >
            {quizes[0].title}
          </p>
        </div>
        <div className="w-full h-full text-white">{quizes[0].desc}</div>
        {/* <EditQuizButton
          slug={quizes[0].slug}
          categorySlug={quizes[0].categorySlug}
          quizAuthor={quizes[0].author}
        /> */}
      </Link>
      <HomeQuizSectionLabel title={'Wybrane Quizy'} />

      {quizes.slice(1).map((quiz) => (
        <div
          className="relative w-full h-[200px] sm:h-[240px] md:h-[200px] lg:h-[280px]"
          key={quiz._id || quiz.slug}
        >
          <Link
            key={quiz.label}
            href={`/quizes/${quiz.slug}`}
            className={`block text-2xl text-white p4 col-span-1 w-full  h-[200px] sm:h-[240px] md:h-[200px] lg:h-[280px]  text-center gap-2 rounded-xl relative group overflow-hidden ${
              !quiz.img && 'bg-slate-800'
            }`}
          >
            {' '}
            {quiz.img && (
              <Image
                src={quiz.img}
                fill
                alt={quiz.title}
                className=" rounded-2xl opacity-40 group-hover:scale-125  duration-300"
              />
            )}
            <p
              className={`absolute  w-full h-full top-1/2 -translate-y-[15%]  text-white ${
                quiz?.title.length > 28 && 'top-1/3'
              } `}
            >
              {quiz?.title}
            </p>
          </Link>
          <EditQuizButton
            slug={quiz.slug}
            categorySlug={quiz.categorySlug}
            quizAuthor={quiz.author}
          />
        </div>
      ))}
      <AddQuizButton />
      <HomeSeeAll path="/quizes" label="Zobacz wszystkie" />
      <HomeQuizSectionLabel title={'Kategorie'} />
      {subCategories.map((mainCategory) => (
        <Link
          key={mainCategory.title}
          href={`/mainCategories/${mainCategory.slug}`}
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
              mainCategory?.title.length > 28 && 'top-1/3'
            } `}
          >
            {mainCategory?.title}
          </p>
          {/* <EditQuizButton slug={mainCategory.slug} /> */}
        </Link>
      ))}
      <HomeSeeAll path="/mainCategories" label="Zobacz wszystkie" />

      <HomeQuizSectionLabel title="Statystyki" />
      <StatsBlock />
      <HomeQuizSectionLabel title="Najlepsi gracze" />

      <RecordsBlock />
    </main>
  )
}
