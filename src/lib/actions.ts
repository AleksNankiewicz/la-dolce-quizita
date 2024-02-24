'use server'

import { quizProps } from '@/types/data'
import { connectToDb } from './connectToDb'
import { Question, Quiz, User } from './models'

import { unstable_noStore as noStore } from 'next/cache'
import firebase from 'firebase/app'
import 'firebase/storage'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from './firebase'
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
      user.gameWon = user.gameWon + 1
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

export const deleteQuiz = async (slug: string) => {
  try {
    connectToDb()

    await Quiz.findOneAndDelete({ slug: slug })

    console.log('quiz deleted')
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const addQuiz = async (quiz: quizProps) => {
  // console.log(quiz)
  try {
    connectToDb()

    const existingQuiz = await Quiz.findOne({ slug: quiz.slug })

    if (!existingQuiz) {
      const newQuiz = new Quiz(quiz)
      const savedQuiz = await newQuiz.save()
      return console.log('hurra')
    }

    if (existingQuiz) {
      const updatedQuiz = await Quiz.findOneAndUpdate(
        { slug: quiz.slug },
        { $set: quiz },
        { new: true }
      )

      return console.log('quiz updated')
    }
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const updateUser = async (userData: any) => {
  try {
    connectToDb()

    const user = await User.findOneAndUpdate(
      { email: userData.email },
      { $set: userData },
      { new: true }
    )

    console.log('user updatated')
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const uploadFilesToFirebase = async (files: File[] | string[]) => {
  const storage = getStorage(app)
  const uploadedImageRefs: string[] = []

  await Promise.allSettled(
    files.map(async (file: File | string, index: number) => {
      try {
        if (file == 'undefined') return ''
        if (typeof file === 'string') {
          uploadedImageRefs[index] = file
          return
        }
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)

        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)

        uploadedImageRefs[index] = url
        console.log(`File ${fileName} uploaded successfully.`)
      } catch (error) {
        console.error(`Error uploading file ${file}: ${error}`)
      }
    })
  )

  return uploadedImageRefs
}

export const uploadImages = async (formData: any) => {
  // Array to store files

  console.log(formData)
  const formDataArray: [string, FormDataEntryValue][] = Array.from(
    formData.entries()
  )

  // Sort the FormData entries based on the numerical part of the name
  formDataArray.sort(([keyA], [keyB]) => {
    const indexA = parseInt(keyA.split('-')[1])
    const indexB = parseInt(keyB.split('-')[1])
    return indexA - indexB
  })

  // Construct a new FormData object with the sorted entries
  const sortedFormData: FormData = new FormData()
  formDataArray.forEach(([key, value]) => {
    sortedFormData.append(key, value)
  })
  const files: File[] = Array.from(sortedFormData.values()) as File[]

  // Log the sorted FormData object
  //return console.log(sortedFormData)

  // return console.log(files)
  // return files

  const imageRefs = await uploadFilesToFirebase(files)

  // Log all files
  return imageRefs
}
