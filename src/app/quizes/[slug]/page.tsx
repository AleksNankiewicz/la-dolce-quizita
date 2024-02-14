'use client'
import React from 'react'
import Image from 'next/image'
import { Award, Coins, CoinsIcon, Gamepad2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

const SingleQuizPage = () => {
  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3">
      <div className=" text-2xl text-white p4 col-span-2 w-full ">
        <h1 className="">Krajobrazy</h1>
      </div>
      <div className="text-black text-2xl  p4 col-span-1 text-center min-h-[150px] rounded-xl relative  overflow-hidden">
        <Image
          src={'/italian-background1.jpg'}
          fill
          alt="background"
          className="overflow-hidden rounded-2xl opacity-40   duration-300"
        />
      </div>
      <div className="text-white   p4 col-span-1  min-h-[150px] rounded-xl flex flex-col items-center justify-between  text-md gap-1">
        <div className="">Test z wiedzy o Włoskich krajobrazach</div>
        <Button className="w-full bg-purple-600 hover:bg-purple-500">
          Graj
        </Button>
      </div>
      <div className="text-white text-sm bg-slate-800 p4 col-span-2 w-full text-center h-[100px] rounded-xl flex justify-evenly items-center ">
        <div className="flex flex-col  justify-center items-center">
          <Timer size={30} />
          <p className=" border-b-[2px] border-white">Czas trwania</p>
          <p>6min</p>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <Gamepad2 size={30} />
          <p className=" border-b-[2px] border-white">Poziom</p>
          <p>Łatwy</p>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <Coins size={30} />
          <p className=" border-b-[2px] border-white">Max punktów</p>
          <p
            className="
          "
          >
            800
          </p>
        </div>
      </div>

      <div className="text-white   p4 col-span-2  min-h-[150px] rounded-xl flex flex-col items-center justify-center text-md gap-1">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
          corrupti ipsam, explicabo ut aliquam minima numquam voluptas, quae
          eum, expedita qui libero. Quidem ipsum temporibus odit quia molestiae?
          Laborum possimus quisquam rerum, dolorem magnam nisi eos veniam
          architecto deleniti sequi alias omnis repellendus in ut? Laborum
          praesentium deserunt accusantium asperiores hic modi. Repellendus
          deserunt ratione ad suscipit accusantium voluptatum placeat provident
          eius sapiente temporibus. Officiis quas animi esse eaque minus, quo
          molestiae ducimus obcaecati itaque, necessitatibus nemo, repellat
          autem porro?
        </p>
      </div>
      <div className=" text-2xl text-white p4 col-span-2 w-full ">
        <h1 className="">Rekordy</h1>
      </div>
      <div className="text-white  bg-slate-800  col-span-2 w-full text-center min-h-[150px] rounded-xl flex-col justify-center items-center p-4  ">
        {records.map((record) => (
          <div
            key={record.username}
            className="flex text-sm  justify-between items-center py-1"
          >
            <div className="flex items-center gap-2">
              {' '}
              <Image
                className="rounded-full w-10 h-10"
                src={record.img}
                alt="avatar"
                width={25}
                height={25}
              />
              <p>{record.username}</p>
            </div>

            <div className="flex flex-col-reverse">
              <p>{record.points}</p>
              <Coins size={25} />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default SingleQuizPage
