'use server'

import { ShopItemProps, UserProps, quizProps } from '@/types/data'
import { connectToDb } from './connectToDb'
import { Category, Level, Question, Quiz, ShopItem, User } from './models'

import { unstable_noStore as noStore } from 'next/cache'
import firebase from 'firebase/app'
import 'firebase/storage'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from './firebase'
import { db } from './db'

export const getPopularQuizes = async (amount = Infinity) => {
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
export const getNewestQuizes = async (amount = Infinity) => {
  noStore()
  try {
    connectToDb()
    const quizes = await Quiz.find().sort({ createdAt: -1 }).limit(amount)
    return quizes
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

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
export const getShopItems = async (amount = Infinity) => {
  noStore()
  try {
    connectToDb()
    const pipeline = []

    pipeline.push({ $sample: { size: amount } })

    const shopItems = await ShopItem.aggregate(pipeline)
    return shopItems
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}
export const buyShopItem = async (shopItem: ShopItemProps, email: string) => {
  noStore()
  try {
    connectToDb()

    const user = await getUserByEmail(email)

    const foundShopItem = (await ShopItem.findById(
      shopItem._id
    )) as ShopItemProps | null
    if (!foundShopItem) {
      throw new Error('Shop item not found')
    }
    //  console.log(foundShopItem)

    if (foundShopItem.type == 'badge') {
      if (user.badges.includes(foundShopItem.img)) {
        console.log('Badge already exists')
      } else {
        user.badges.push(foundShopItem.img)
      }
    }

    if (foundShopItem.type === 'profileFrame') {
    }

    user.quizCoins -= foundShopItem.price

    await user.save()
    console.log('user saved')

    return foundShopItem
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const getUsers = async (amount = Infinity) => {
  noStore()
  try {
    connectToDb()
    const users = await User.find().limit(amount)
    return users
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}
export const getTopFiveUsers = async (amount = 5) => {
  noStore()
  try {
    connectToDb()
    const users = await User.find().sort({ points: -1 }).limit(amount)
    return users
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}
export const getLevels = async () => {
  noStore()
  try {
    connectToDb()
    const levels = await Level.find()
    return levels
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const getProfileFrames = async () => {
  noStore()
  try {
    connectToDb()
    const levels = await Level.find({}, { profileFrame: 1, _id: 0 }).limit(3) // Fetching only the profileFrame field
    return levels.map((level) => level.profileFrame) // Extracting profileFrame from each level object
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

export const setBadge = async (email: string, badge: string) => {
  noStore()
  try {
    connectToDb()
    const user = await getUserByEmail(email)
    user.selectedBadge = badge
    await user.save()
    return console.log('user badge updated')
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}
export const setProfileFrame = async (email: string, profileFrame: string) => {
  noStore()
  try {
    connectToDb()
    const user = await getUserByEmail(email)
    user.selectedProfileFrame = profileFrame
    await user.save()
    return console.log('user profileFrame updated')
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

    console.log('quiz slug', quizSlug)
    const user = await getUserByEmail(email)
    const levels = await getLevels()

    let highestPointsQuiz = null

    let distanceBetweenRecords = null
    const quizzesWithSlug = user.quizesPlayed.filter(
      (quiz: any) => quiz.slug === quizSlug
    )
    if (quizzesWithSlug.length > 0) {
      highestPointsQuiz = quizzesWithSlug.reduce(
        (prev: { points: number }, current: { points: number }) => {
          return prev.points > current.points ? prev : current
        }
      )

      if (highestPointsQuiz.points < points) {
        user.points += points - highestPointsQuiz.points
        user.quizCoins += points - highestPointsQuiz.points

        distanceBetweenRecords = points - highestPointsQuiz.points

        console.log('user points updated on old quiz')

        console.log('points added', points - highestPointsQuiz.points)
      } else {
        console.log('same record or smaller')
      }
    } else {
      user.points += points
      ;('new quiz points')
      user.quizCoins += points
      if (isAllCorrect) {
        user.gameWon = user.gameWon + 1
      }
    }

    console.log(highestPointsQuiz)

    user.gamePlayed++
    user.quizesPlayed.push({ slug: quizSlug, points: points })

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
    let newLevelData = null
    let newLevel: null | string = null
    for (const level of levels) {
      if (user.points >= level.threshold) {
        newLevel = level.number
      } else {
        break // Stop searching if the user's points are less than the current level's threshold
      }
    }

    // Update user's level if a new level is found
    if (newLevel !== null && newLevel !== user.level) {
      user.level = newLevel
      newLevelData = levels.find((level) => level.number === newLevel)
    }

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

    const responseObject = {
      newLevelData,
      distanceBetweenRecords,
    }
    return responseObject

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
