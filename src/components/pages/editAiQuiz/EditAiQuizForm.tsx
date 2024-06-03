'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { generateAiQuiz } from '@/lib/actions/generateAiQuiz'
import { ExtendedQuiz } from '@/types/extended'
import EditQuizForm from '@/components/pages/editQuiz/EditQuizForm'

const EditAiQuizForm = () => {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState<ExtendedQuiz | null>(null)
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const generatedQuizString = await generateAiQuiz(prompt)
      console.log(generatedQuizString)
      if (!generatedQuizString) return
      const generatedQuiz = JSON.parse(generatedQuizString) as ExtendedQuiz
      console.log(generatedQuiz)
      setLoading(false)
      setQuiz(generatedQuiz)
    } catch (error) {
      console.error('Error generating quiz:', error)
    }
  }

  return (
    <>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>
            Wpisz tutaj tytuł, bądź podpowieć co chcesz wygenerować
          </CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Quiz o twojej starej..."
            onBlur={({ target }) => setPrompt(target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button disabled={loading} onClick={handleSubmit}>
            Wyślij
          </Button>
        </CardFooter>
      </Card>
      {quiz && <EditQuizForm initialQuiz={quiz} />}
    </>
  )
}

export default EditAiQuizForm
