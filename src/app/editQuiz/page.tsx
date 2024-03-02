import EditQuiz from '@/components/EditQuiz'
import { getBlankQuiz } from '@/lib/actions'
import React from 'react'

const AddNewQuizPage = async () => {
  const emptyQuiz = await getBlankQuiz()
  return (
    <div>
      <EditQuiz quiz={emptyQuiz} />
    </div>
  )
}

export default AddNewQuizPage
