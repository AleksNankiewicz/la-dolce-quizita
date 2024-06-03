export const answerButtonColors = [
  {
    background: 'bg-orange-500',
    shadow: 'shadow-orange-600',
    text: 'text-orange-500',
  },
  {
    background: 'bg-blue-500',
    shadow: 'shadow-blue-600',
    text: 'text-blue-500',
  },
  {
    background: 'bg-green-500',
    shadow: 'shadow-green-600',
    text: 'text-green-500',
  },
  { background: 'bg-red-500', shadow: 'shadow-red-600', text: 'text-red-500' },
  {
    background: 'bg-amber-500',
    shadow: 'shadow-amber-600',
    text: 'text-amber-500',
  },
  {
    background: 'bg-pink-500',
    shadow: 'shadow-pink-600',
    text: 'text-pink-500',
  },
  {
    background: 'bg-cyan-500',
    shadow: 'shadow-cyan-600',
    text: 'text-cyan-500',
  },
  {
    background: 'bg-lime-500',
    shadow: 'shadow-lime-600',
    text: 'text-lime-500',
  },
  {
    background: 'bg-indigo-500',
    shadow: 'shadow-indigo-600',
    text: 'text-indigo-500',
  },
  {
    background: 'bg-teal-500',
    shadow: 'shadow-teal-600',
    text: 'text-teal-500',
  },
  {
    background: 'bg-rose-500',
    shadow: 'shadow-rose-600',
    text: 'text-rose-500',
  },
] as const

export type TAnswerButtonColors = {
  background: string
  shadow: string
  text: string
}
