import { create } from 'zustand'

type CounterStore = {
  count: number
}

export const useCounterStore = create<CounterStore>(() => ({
  count: 0,
}))

type GameStore = {
  isGameStarted: boolean
  questionTime: number
  questionsNumber: number
  gamePoints: number
  actualQuestionTime: number
  actualQuestionsNumber: number

  setIsGameStarted: (boolean: boolean) => void
  setQuestionTime: () => void
  setQuestionsNumber: (number: number) => void
  setGamePoints: (points: number) => void
  decrementActualQuestionTime: () => void
  setActualQuestionsNumber: (number: number) => void
}
export const useGameStore = create<GameStore>((set) => ({
  isGameStarted: false,
  questionTime: 0,
  questionsNumber: 0,
  gamePoints: 0,
  actualQuestionTime: 0,
  actualQuestionsNumber: 1,
  setIsGameStarted: (boolean: boolean) => {
    set({ isGameStarted: boolean })
  },
  setQuestionTime: () => {
    set({ actualQuestionTime: 100 })
  },
  setQuestionsNumber: (number: number) => {
    set({ questionsNumber: number })
  },
  setGamePoints: (points: number) => {
    set({ gamePoints: points })
  },
  decrementActualQuestionTime: () => {
    set((state) => ({ actualQuestionTime: state.actualQuestionTime - 1 }))
  },
  setActualQuestionsNumber: (number: number) => {
    set({ actualQuestionsNumber: number })
  },
}))
