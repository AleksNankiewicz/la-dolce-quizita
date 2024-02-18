export type answearProps = {
  title: string
  isCorrect: boolean
}
export type questionsProps = {
  title: string
  correctAnswear: boolean
  points: number
  answears: answearProps[]
  time: number
}
