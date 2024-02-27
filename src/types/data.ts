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
}

export type quizProps = {
  title: string
  desc: string
  level: string
  img: string | File
  slug: string
  records: recordProps[]
  questions: any[]
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
}

export type categoryProps = {
  parentCategory: string
  title: string
  desc: string
  img: string
  slug: string
}
