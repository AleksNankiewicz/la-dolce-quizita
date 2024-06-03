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
  resetQuestionTime: () => void
  setQuestionsNumber: (number: number) => void
  setGamePoints: (points: number) => void
  decrementActualQuestionTime: (value: number) => void
  setActualQuestionsNumber: (number: number) => void
}
export const useGameStore = create<GameStore>((set) => ({
  isGameStarted: false,
  questionTime: 0,
  questionsNumber: 0,
  gamePoints: 0,
  actualQuestionTime: 0,
  actualQuestionsNumber: 1,
  setIsGameStarted: (isGameStarted: boolean) => {
    set({ isGameStarted })
  },
  resetQuestionTime: () => {
    set({ actualQuestionTime: 100 })
  },
  setQuestionsNumber: (questionsNumber: number) => {
    set({ questionsNumber })
  },
  setGamePoints: (points: number) => {
    set({ gamePoints: points })
  },
  decrementActualQuestionTime: (value: number) => {
    set((state) => ({ actualQuestionTime: state.actualQuestionTime - value }))
  },
  setActualQuestionsNumber: (actualQuestionsNumber: number) => {
    set({ actualQuestionsNumber })
  },
}))

export const resetStore = () => {
  useGameStore.setState({
    // Reset state in useGameStore
    isGameStarted: false,
    questionTime: 0,
    questionsNumber: 0,
    gamePoints: 0,
    actualQuestionTime: 0,
    actualQuestionsNumber: 1,
  })
}

type NavStore = {
  refresh: boolean
  setRefresh: (refresh: boolean) => void // Modify the parameter name to be descriptive
}

const useNavStore = create<NavStore>((set) => ({
  refresh: false,
  setRefresh: (refresh) => set({ refresh }), // Update the state with the provided value
}))

export default useNavStore
