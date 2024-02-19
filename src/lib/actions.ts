'use server'

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

export const getUsers = async () => {
  noStore()
  try {
    connectToDb()
    const users = await User.find()
    return users
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const updateUserAfterGame = async (
  email: string,
  points: number,
  isAllCorrect: boolean
) => {
  try {
    connectToDb()
    const user = await getUserByEmail(email)

    user.points = user.points + points
    user.gamePlayed = user.gamePlayed + 1
    if (isAllCorrect) {
      user.GameWon = user.GameWon + 1
    }

    await user.save()
    console.log('user updated')
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const addQuestion = async () => {
  try {
    connectToDb()

    const newQuestion = {
      title:
        'Polacy mają Kowalskiego i Nowaka, a jakie nazwisko jest najpopularniejsze we Włoszech?',
      img: 'https://images.pexels.com/photos/1194412/pexels-photo-1194412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      points: 100,
      time: 20,
      answears: [
        {
          title: 'Rosso',
          isCorrect: false,
        },
        {
          title: 'Russo',
          isCorrect: true,
        },
        {
          title: 'Bianco',
          isCorrect: false,
        },
        {
          title: 'Di Pasquale',
          isCorrect: false,
        },
      ],
      records: [
        { user: 'Aleks', score: 99, time: 90 },
        { user: 'Aleks', score: 99, time: 90 },
        { user: 'Aleks', score: 99, time: 90 },
        { user: 'Aleks', score: 99, time: 90 },
      ],
    }

    const quiz = await getQuizes()
    quiz[0].questions.push(newQuestion)
    await quiz[0].save()
    console.log('question pushed')
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const getUserByEmail = async (email: string) => {
  'use server'
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

export const getQuizBySlug = async (slug: string) => {
  try {
    connectToDb()
    const quiz = await Quiz.findOne({ slug: slug })

    return quiz
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch user by email!')
  }
}
