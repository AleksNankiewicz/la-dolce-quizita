export type answearProps = {
  title: string
  isCorrect: boolean
}
export type questionsProps = {
  title: string
  correctAnswear?: boolean
  points: number
  answears: answearProps[]
  time: number
  img: string
}

export type sessionUserProps = {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
  isAdmin: boolean
  username: string
  gameWon: number // Define the property 'gameWon'
  gamePlayed: number // Define the property 'gamePlayed'
  points: number // Define the property 'points'
}
