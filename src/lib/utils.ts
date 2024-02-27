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
  const units = [
    '',
    'tys',
    'mln',
    'mld',
    'bln',
    'bld',
    'trln',
    'trlrd',
    'kwrdln',
    'kwrldrd',
    'kwnl',
    'kwnlrd',
  ] // Możesz rozszerzyć w zależności od potrzeb
  let unitIndex = 0

  while (number >= 1000 && unitIndex < units.length - 1) {
    number /= 1000
    unitIndex++
  }

  return `${Math.round(number * 10) / 10}${units[unitIndex]}`
}

export function formatTime(time: number) {
  const units = ['y', 'd', 'h', 'm', 's']
  const unitNames = ['year', 'day', 'hour', 'minute', 'second']
  const formattedTime: string[] = []

  for (let i = 0; i < units.length; i++) {
    if (time >= 31536000 && units[i] === 'y') {
      const years = Math.floor(time / 31536000)
      formattedTime.push(`${years}${years > 1 ? 'y' : ' year'}`)
      time %= 31536000
    } else if (time >= 86400 && units[i] === 'd') {
      const days = Math.floor(time / 86400)
      formattedTime.push(`${days}${days > 1 ? 'd' : ' day'}`)
      time %= 86400
    } else if (
      time >= 3600 &&
      units[i] === 'h' &&
      !formattedTime.includes('y')
    ) {
      const hours = Math.floor(time / 3600)
      formattedTime.push(`${hours}${hours > 1 ? 'h' : ' hour'}`)
      time %= 3600
    } else if (time >= 60 && units[i] === 'm' && !formattedTime.includes('y')) {
      const minutes = Math.floor(time / 60)
      formattedTime.push(`${minutes}${minutes > 1 ? 'm' : ' minute'}`)
      time %= 60
    } else if (
      units[i] === 's' &&
      formattedTime.length < 2 &&
      time !== 0 &&
      !formattedTime.includes('y')
    ) {
      formattedTime.push(`${time}${time > 1 ? 's' : ' second'}`)
    }
  }

  return formattedTime.join(' ')
}

export function removeSpaces(string: string) {
  const sanitizedString = string.replace(/[^\w\s-]/gi, '')
  // Replace spaces with hyphens
  return sanitizedString.replace(/\s+/g, '-')
}
export const disableTextInInput = (e: any) => {
  const inputElement: HTMLInputElement = e.currentTarget
  const newText = e.currentTarget.textContent
  const regex = /^[0-9]*$/ // Regular expression to match only numbers

  console.log(newText)

  if (
    !newText ||
    (newText.length === 1 && newText === '0') ||
    newText.match(/^0+$/)
  ) {
    e.currentTarget.textContent = '0'
    return
  }
  if (newText.match(/^0+[1-9]/)) {
    e.currentTarget.textContent = newText.replace(/^0+/, '')
    return
  }

  if (!newText || (newText.length === 1 && newText === '0')) {
    console.log('hello')
    e.currentTarget.textContent = '0'
  }
  // If the entered text does not match the regex, prevent it from being added
  if (!regex.test(newText)) {
    // Prevent the default behavior of the input event (typing)
    e.preventDefault()

    // Remove non-numeric characters
    const sanitizedText = newText.replace(/\D/g, '')

    // If the resulting text is empty or NaN, or less than 0, replace it with a default value ('0')
    if (
      sanitizedText === '' ||
      isNaN(parseInt(sanitizedText)) ||
      parseInt(sanitizedText) < 0
    ) {
      e.currentTarget.textContent = '0'
    } else {
      // Otherwise, set the sanitized text
      e.currentTarget.textContent = sanitizedText
    }
  }
}

export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0') // Pobierz dzień miesiąca i dodaj zero z przodu, jeśli jest jednocyfrowy
  const month = String(date.getMonth() + 1).padStart(2, '0') // Pobierz miesiąc (od 0 do 11) i dodaj zero z przodu, jeśli jest jednocyfrowy
  const year = date.getFullYear() // Pobierz rok (czterocyfrowy)

  return `${day}-${month}-${year}` // Zwróć sformatowaną datę jako string w formacie "DD-MM-RRRR"
}

const userCreatedAt = new Date() // Załóżmy, że to jest data utworzenia użytkownika
const formattedDate = formatDate(userCreatedAt) // Użyj funkcji formatDate() do sformatowania daty
console.log(formattedDate) // Wyświetli sformatowaną datę w formacie "DD-MM-RRRR"
