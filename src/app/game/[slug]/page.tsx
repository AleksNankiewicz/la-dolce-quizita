import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getQuizBySlug } from '@/lib/actions'
import Game from '@/components/Game'
// import { getQuizBySlug } from '@/lib/actions'

// const getData = async (slug: string) => {
//   const res = await fetch(`http://localhost:3000/api/game/${slug}`)

//   if (!res.ok) {
//     throw new Error('Something went wrong')
//   }
//   return res.json()
// }

const SingleGamePage = async ({ params }: any) => {
  const { slug } = params
  const quiz = await getQuizBySlug(slug)

  // const [index, setIndex] = useState<number>(0)
  // console.log(quiz)

  // useEffect(() => {
  //   const interval = setInterval(() => setIndex((prev) => prev + 1), 1)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])
  // console.log(index)

  return <Game data={JSON.parse(JSON.stringify(quiz))} />
}

// export async function getServerSideProps(context: { params: { slug: any } }) {
//   const { slug } = context.params
//   const quizData = await getQuizBySlug(slug)

//   return {
//     props: { quizData },
//   }
// }

export default SingleGamePage
