import React from 'react'
import Image from 'next/image'
const SingleGamePage = () => {
  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3 ">
      <div className=" text-3xl text-black  col-span-2 w-full  min-h-[200px]  rounded-2xl flex justify-center items-center  relative">
        <Image
          src={'/italian-background1.jpg'}
          fill
          alt="background"
          className="overflow-hidden rounded-2xl  group-hover:scale-125  duration-300"
        />
      </div>
      <div className=" text-2xl text-white p4 col-span-2 w-full text-center py-5">
        <p>Jaka jest najlepsza pizza?</p>
      </div>
      <button className=" text-2xl text-white p4 col-span-1 w-full  min-h-[200px] bg-purple-600 rounded-2xl flex justify-center items-center text-center">
        <p>Margherita</p>
      </button>
      <button className=" text-2xl text-white p4 col-span-1 w-full  min-h-[200px] bg-purple-600 rounded-2xl flex justify-center items-center text-center">
        <p>Margherita</p>
      </button>
      <button className=" text-2xl text-white p4 col-span-1 w-full  min-h-[200px] bg-purple-600 rounded-2xl flex justify-center items-center text-center">
        <p>Margherita</p>
      </button>
      <button className=" text-2xl text-white p4 col-span-1 w-full  min-h-[200px] bg-purple-600 rounded-2xl flex justify-center items-center text-center">
        <p>Margherita</p>
      </button>
    </main>
  )
}

export default SingleGamePage
