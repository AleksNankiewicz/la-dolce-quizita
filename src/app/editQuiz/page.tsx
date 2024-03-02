import EditQuiz from '@/components/EditQuiz'
import React from 'react'

const AddNewQuizPage = async () => {
  const emptyQuiz = await {
    title: 'tytuł',
    desc: 'opis',
    level: 'Łatwy',
    questions: [
      {
        title: 'tytuł',
        time: 20,
        points: 20,
        answears: [],
      },
    ],
  }
  return (
    <div>
      <EditQuiz quiz={emptyQuiz} />
    </div>
  )
}

export default AddNewQuizPage
