import { addQuestion } from '@/lib/actions'
import React from 'react'

const page = async () => {
  await addQuestion()
  return <div>pageeee</div>
}

export default page
