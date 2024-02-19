import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shuffleArray(array: []) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export function formatNumber(number: number) {
  const units = ['', 'tys', 'mln', 'mld'] // Możesz rozszerzyć w zależności od potrzeb
  let unitIndex = 0

  while (number >= 1000 && unitIndex < units.length - 1) {
    number /= 1000
    unitIndex++
  }

  return `${Math.round(number * 10) / 10}${units[unitIndex]}`
}
