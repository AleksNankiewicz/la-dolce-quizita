import CardWrapper from '@/components/auth/CardWrapper'
import LoginForm from '@/components/auth/LoginForm'
import RecordsBlock from '@/components/layouts/RecordsBlock'
import StatsBlock from '@/components/layouts/StatsBlock'
import { getQuizes } from '@/lib/actions'
import { Award, Coins, CoinsIcon, Gamepad2 } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

const quizes = [
  {
    label: 'Jedzenie',
    img: '/pizza.webp',
    path: '#',
  },
  {
    label: 'Gramatyka',
    img: '/italian-grammar.jpg',
    path: '#',
  },
  {
    label: 'Słówka',
    img: '/italian-words.jpg',
    path: '#',
  },
  {
    label: 'Kultura',
    img: '/italian-culture.jpg',
    path: '#',
  },
]

const records = [
  {
    img: '/noavatar.png',
    username: 'Aleks Nankiewicz',
    points: 400,
  },
  {
    img: '/noavatar.png',
    username: 'Aleks Nankiewicz',
    points: 400,
  },
  {
    img: '/noavatar.png',
    username: 'Aleks Nankiewicz',
    points: 400,
  },
  {
    img: '/noavatar.png',
    username: 'Aleks Nankiewicz',
    points: 400,
  },
  {
    img: '/noavatar.png',
    username: 'Aleks Nankiewicz',
    points: 400,
  },
]

export default async function Home() {
  const quizes = await getQuizes()

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3">
      <div className=" text-2xl text-white p4 col-span-2 w-full ">
        <h1 className="">Wyzwanie miesiąca</h1>
      </div>
      <Link
        href={'/quizes/2813256'}
        className="block text-black text-2xl  p4 col-span-2 w-full text-center h-[250px] sm:h-[250px] md:h-[350px] lg:h-[600px] rounded-xl relative group overflow-hidden"
      >
        <Image
          src={
            'https://images.pexels.com/photos/344649/pexels-photo-344649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          fill
          alt="background"
          className="overflow-hidden rounded-2xl opacity-40 group-hover:scale-125  duration-300"
        />
        <p className="absolute  w-full h-full top-1/2 -translate-y-[15%] text-4xl text-white">
          Kultura
        </p>
      </Link>
      <div className=" text-2xl text-white p4 col-span-2 w-full">
        <h1 className="">Wybrane quizy</h1>
      </div>

      {quizes.map((quiz) => (
        <Link
          key={quiz.label}
          href={`/quizes/${quiz.slug}`}
          className="block text-2xl text-white p4 col-span-1 w-full  h-[150px] sm:h-[200px] md:h-[300px] lg:h-[500px]  text-center gap-2 rounded-xl relative group overflow-hidden"
        >
          {' '}
          <Image
            src={quiz.img}
            fill
            alt={quiz.title}
            className=" rounded-2xl opacity-40 group-hover:scale-125  duration-300"
          />
          <p className="absolute  w-full h-full top-1/2 -translate-y-[15%]  text-white">
            {quiz.title}
          </p>
        </Link>
      ))}

      <div className=" text-2xl text-white p4 col-span-2 w-full">
        <h1 className="">Statysktyki</h1>
      </div>
      <StatsBlock />
      <div className=" text-2xl text-white p4 col-span-2 w-full">
        <h1 className="">Najlepsi użytkownicy</h1>
      </div>
      <RecordsBlock />
    </main>
  )
}
