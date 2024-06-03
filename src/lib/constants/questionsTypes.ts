import { QuestionType } from '@prisma/client'
import {
  ArrowDown01,
  CopyCheck,
  FileQuestion,
  LucideProps,
  MessageCircleQuestion,
} from 'lucide-react'

type TQuestionsTypes = {
  title: string
  value: QuestionType
  icon: React.ComponentType<LucideProps> // Użyj React.ComponentType jako typu dla komponentu
}

export const questionsTypes: TQuestionsTypes[] = [
  {
    title: 'Otwarte',
    value: 'multipleChoice',
    icon: CopyCheck,
  },
  {
    title: 'Sortowalne',
    value: 'sortable',
    icon: ArrowDown01,
  },
  {
    title: 'Zamknięte',
    value: 'openEnded',
    icon: MessageCircleQuestion,
  },

  // {
  //   title: 'Prawda Fałsz',
  //   value: 'openEnded',
  //   icon: FileQuestion,
  // },
]
