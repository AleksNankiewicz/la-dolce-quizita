import CardWrapper from '@/components/auth/CardWrapper'
import LoginForm from '@/components/auth/LoginForm'
import EditQuizButton from '@/components/layouts/EditQuizButton'
import RecordsBlock from '@/components/layouts/RecordsBlock'
import StatsBlock from '@/components/layouts/StatsBlock'
import { AddQuizButton } from '@/components/layouts/addQuizButton'
import { getQuizes } from '@/lib/actions'
import { Award, Coins, CoinsIcon, Gamepad2 } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Home() {
  const quizes = await getQuizes(9)

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      <div className=" text-2xl text-white p4 col-span-2 md:col-span-4 w-full ">
        <h1 className="">Najnowsze wyzwanie</h1>
      </div>
      <Link
        href={`/quizes/${quizes[0].slug}`}
        className="block text-black text-2xl   p4 col-span-2 md:col-span-4 w-full text-center h-[250px] sm:h-[250px] md:h-[350px] lg:h-[600px] rounded-xl relative group overflow-hidden"
      >
        {quizes[0].img && (
          <Image
            src={quizes[0].img}
            fill
            alt="background"
            className="overflow-hidden rounded-2xl opacity-40 group-hover:scale-125  duration-300"
          />
        )}
        <p
          className={`absolute  max-w-full h-full top-1/2 left-1/2 -translate-x-[50%] -translate-y-[15%] text-4xl md:text-6xl text-white ${
            quizes[0].title.length > 20 && 'top-1/3'
          }`}
        >
          {quizes[0].title}
        </p>
        <EditQuizButton slug={quizes[0].slug} />
      </Link>
      <div className=" text-2xl text-white p4 col-span-2 md:col-span-4 w-full">
        <h1 className="">Wybrane quizy</h1>
      </div>

      {quizes.slice(1).map((quiz) => (
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
          <EditQuizButton slug={quiz.slug} />
        </Link>
      ))}
      <AddQuizButton />
      <div className=" text-xl text-white p4 col-span-2 w-full flex justify-center md:col-span-4">
        <Link href={'/quizes'} className="underline">
          Zobacz wszystkie
        </Link>
      </div>

      <div className=" text-2xl text-white p4 col-span-2 md:col-span-4 w-full">
        <h1 className="">Statysktyki</h1>
      </div>
      <StatsBlock />
      <div className=" text-2xl text-white p4 col-span-2 md:col-span-4 w-full">
        <h1 className="">Najlepsi użytkownicy</h1>
      </div>
      <RecordsBlock />
    </main>
  )
}
