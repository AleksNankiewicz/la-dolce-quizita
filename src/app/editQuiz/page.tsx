import EditQuiz from '@/components/EditQuiz'
import React from 'react'

const AddNewQuizPage = () => {
  const emptyQuiz = {
    questions: [
      {
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
