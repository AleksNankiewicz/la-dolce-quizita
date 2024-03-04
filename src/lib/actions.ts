'use server'

import { quizProps } from '@/types/data'
import { connectToDb } from './connectToDb'
import { Category, Question, Quiz, User } from './models'

import { unstable_noStore as noStore } from 'next/cache'
import firebase from 'firebase/app'
import 'firebase/storage'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from './firebase'
// export const getQuizes2 = async (amount = Infinity) => {
//   noStore()
//   try {
//     connectToDb()
//     const quizes = await Quiz.find().sort({ updatedAt: -1 }).limit(amount)
//     return quizes
//   } catch (err: any) {
//     console.log(err)
//     throw new Error(err)
//   }
// }

export const getQuizes = async (amount = Infinity) => {
  noStore()
  try {
    connectToDb()
    const quizes = await Quiz.find().sort({ playCount: -1 }).limit(amount)
    return quizes
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const getQuizSlugsAndTitles = async (amount = Infinity) => {
  noStore() // Assuming these are helper functions defined elsewhere
  try {
    connectToDb() // Assuming these are helper functions defined elsewhere
    const quizes = await Quiz.find()
      .select('slug title')
      .sort({ playCount: -1 })
      .limit(amount)
    return quizes.map((quiz) => ({ slug: quiz.slug, title: quiz.title })) // Return array of objects with slug and title
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const getSubCategories = async (amount = Infinity) => {
  noStore()
  try {
    connectToDb()
    const subCategory = await Category.find()
      .sort({ updatedAt: -1 })
      .limit(amount)
    return subCategory
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export const getRandomSubCategories = async (amount = Infinity) => {
  noStore()
  try {
    connectToDb()
    const subCategory = await Category.aggregate([
      { $sample: { size: amount } }, // Retrieve 'amount' random documents from the collection
    ])
    return subCategory
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export const getQuizesByCategories = async (slug: string) => {
  noStore()
  try {
    connectToDb()
    const subCategory = await Quiz.find({ categorySlug: slug }).sort({
      updatedAt: -1,
    })

    return subCategory
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export const setCategory = async (
  title: string,
  desc: string,
  img: string,
  slug: string
) => {
  try {
    connectToDb()
    const existingCategory = await Category.findOne({ slug: slug })

    if (existingCategory) {
      // If the category exists, update its fields
      existingCategory.title = title
      existingCategory.desc = desc
      existingCategory.img = img
      await existingCategory.save()
      console.log('Category updated')
    } else {
      // If the category does not exist, create a new one
      const newCategory = new Category({
        title,
        img,
        desc,
        slug,
      })
      await newCategory.save()
      console.log('New category created')
    }
  } catch (err: any) {
    console.error(err)
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

export const deleteCategory = async (slug: string) => {
  console.log(slug)
  try {
    connectToDb()
    const category = await Category.findOneAndDelete({ slug: slug })
    return category
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const setUserPermisson = async (email: string, permissions: any) => {
  try {
    connectToDb()
    const user = await User.findOne({ email: email })

    user.permissions = permissions

    user.save()

    console.log('user updated')
    return null
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const updateAfterGame = async (
  email: string,
  points: number,
  isAllCorrect: boolean,
  quizSlug: string
) => {
  try {
    connectToDb()
    const user = await getUserByEmail(email)

    user.points = user.points + points
    user.gamePlayed = user.gamePlayed + 1
    user.quizesPlayed.push(quizSlug)
    if (isAllCorrect) {
      user.gameWon = user.gameWon + 1
    }
    const lastGameDate = user.lastGameDate ?? new Date(0)
    const now = new Date()
    const hoursSinceLastGame =
      (now.getTime() - lastGameDate.getTime()) / (1000 * 3600)

    if (hoursSinceLastGame <= 24) {
      // Jeśli ostatnia gra była mniej niż 24 godziny temu, zwiększ streak o 1
      user.streak = (user.streak ?? 0) + 1
    } else {
      // W przeciwnym razie, ustaw streak na 1
      user.streak = 1
    }

    // Zaktualizuj datę ostatniej gry
    user.lastGameDate = now

    await user.save()
    console.log('user updated')

    const quiz = await getQuizBySlug(quizSlug)

    const existingRecordIndex = quiz.records.findIndex(
      (record: { email: any }) => record.email === user.email
    )

    if (existingRecordIndex !== -1) {
      // If a record exists, update it

      if (quiz.records[existingRecordIndex].score > points) return

      // Update the score
      await Quiz.updateOne(
        { _id: quiz._id, 'records.email': user.email },
        { $set: { 'records.$.score': points } }
      )
      console.log('Quiz updated successfully.')
    } else {
      // If no record exists, push a new record
      quiz.records.push({
        email: user.email,
        score: points,
      })
    }

    await quiz.save()

    console.log('quiz updated')
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const updateQuizPlayCount = async (slug: string) => {
  try {
    connectToDb()
    const quiz = await Quiz.findOne({ slug: slug })
    quiz.playCount += 1
    await quiz.save()
    return console.log('quiz playCountUpdated')
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch quiz by email!')
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
  try {
    noStore()
    connectToDb()
    const user = await User.findOne({ email: email })

    return user
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch user by email!')
  }
}
export const getUserBySlug = async (slug: string) => {
  try {
    noStore()
    connectToDb()
    const user = await User.findOne({ slug: slug })

    return user
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch user by slug!')
  }
}

export const getBlankQuiz = async () => {
  try {
    const blankQuiz = {
      title: 'tytuł',
      desc: 'opis',
      level: 'Łatwy',
      questions: [
        {
          id: Math.floor(Math.random() * 99999),
          title: 'tytuł',
          time: 20,
          points: 20,
          answears: [],
        },
      ],
    }

    return blankQuiz
  } catch (error) {}
}

export const deleteUserByEmail = async (email: string) => {
  try {
    noStore()
    connectToDb()
    const user = await User.findOneAndDelete({ email: email })
    console.log('user deleted')
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
    throw new Error('Failed to fetch quiz by email!')
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

///nie weim c o to

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
