'use server'

import { db } from '../db'

export const deleteQuiz = async (id: string) => {
  try {
    await db.quiz.delete({
      where: {
        id: id,
      },
    })

    console.log('quiz deleted')
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}
