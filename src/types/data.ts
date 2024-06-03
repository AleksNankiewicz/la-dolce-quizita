export type answearProps = {
  id: string
  title: string
  isCorrect: boolean
}
export type questionsProps = {
  id: string
  title: string
  correctAnswear?: boolean
  points: number
  answears: answearProps[]
  time: number
  img: string
  type: 'multiple-choice' | 'open-ended' | 'sortable'
  shuffledAnswears?: answearProps[]
}

export type quizProps = {
  createdAt: Date
  access: string
  title: string
  desc: string
  level: string
  img: string | File
  author: string
  slug: string
  categorySlug: string
  categoryName: string
  records: recordProps[]
  questions: questionsProps[]
  playCount: number
  questionsPercent: number
  id: string
  reward: string
}

export type recordProps = {
  email: string
  score: number
}

export type sessionUserProps = {
  name?: string | null | undefined
  email: string
  img?: string | null | undefined
  isAdmin: boolean
  username: string
  gameWon: number // Define the property 'gameWon'
  gamePlayed: number // Define the property 'gamePlayed'
  points: number // Define the property 'points'
  slug: string
}

export type categoryProps = {
  parentCategory: string
  title: string
  desc: string
  img: string
  slug: string
}

export type QuizCategoryProps = {
  level: string
  access: string
  categorySlug: string
  categoryName: string
  questionsAmount: number
}

export type LevelProps = {
  number: number
  threshold: number
  badge: string
  profileFrame: string
}

export type UserProps = {
  username: string
  email: string
  password: string
  isAdmin: boolean
  img?: string
  points: number
  gamePlayed: number
  gameWon: number
  streak: number
  lastGameDate?: Date
  permissions?: string[]
  selectedBadge?: string
  selectedProfileFrame?: string
  level: number
  isVerified: boolean
  slug: string
  quizesPlayed: QuizesPlayedProps[]
  badges: string[]
  quizCoins: number
}

export type ShopItemProps = {
  _id(_id: any): unknown
  price: number
  promotion: number
  type: 'badge' | 'profileFrame'
  img: string
  desc: string
  title: string
}

export type QuizesPlayedProps = {
  slug: string
  points: number
}
