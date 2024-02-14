import { connectToDb } from './connectToDb'
import { Question, Quiz, User } from './models'

import { unstable_noStore as noStore } from 'next/cache'

export const getQuizes = async () => {
  noStore()
  try {
    connectToDb()
    const quizes = await Quiz.find()
    return quizes
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const addQuestion = async () => {
  try {
    connectToDb()

    const newQuestion = new Question({
      title: 'test2',
      answears: [],
    })

    const quiz = await getQuizes()
    quiz[0].questions.push(newQuestion)
    await quiz[0].save()
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    connectToDb()
    const user = await User.findOne({ email: email })

    return user
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch user by email!')
  }
}

export const addUser = async (
  email: string,
  password: string,
  name: string
) => {
  connectToDb()

  const newUser = new User({
    email: email,
    password: password,
    username: name,
  })
  await newUser.save()
}
