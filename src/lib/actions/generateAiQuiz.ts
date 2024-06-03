'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const cleanUpContent = (content: string) => {
  // Remove backticks, newlines, and leading/trailing whitespace
  return content.replace(/`/g, '').replace(/\n/g, '').trim()
}

const promptGuideLine = ` Napisz tytuł i opis quizu, a następnie wygeneruj 10 pytań, z czterema odpowiedziami na każde z nich, po polsku, zgodnie z modelem:

enum QuizLevel {
    easy
    medium
    hard
    expert
  }
  
  enum QuizVisibility {
    public
    private
  }
  
  enum QuestionType {
    multipleChoice
    openEnded
    sortable
    trueOrFalse
  }
  
  enum QuizAccess {
    all
    authorizedOnly
  }


  model Quiz {
    id               String         @id @default(cuid())
    title            String
    desc             String?
    img              String?
    slug             String         @default(cuid())
    level            QuizLevel      @default(easy)
    visibility       QuizVisibility @default(public)
    categories       Category[]     @relation("CategoryQuizzes")
    records          Record[]
    access           QuizAccess     @default(all)
    questions        Question[]
    favoritedBy      User[]         @relation("UserFavoriteQuizzes")
    playedBy         User[]         @relation("UserPlayedQuizzes")
    author           User           @relation(fields: [authorId], references: [id], name: "UserCreatedQuizzes")
    authorId         String
    playCount        Int            @default(0)
    reward           String?
    questionsPercent Int
    hiddenQuestions  Boolean        @default(false)
    createdAt        DateTime       @default(now())
    updatedAt        DateTime       @updatedAt
  }
  
  model Question {
    id        String       @id @default(cuid())
    title     String
    img       String
    type      QuestionType @default(multipleChoice)
    time      Int          @default(20)
    points    Int          @default(20)
    quiz      Quiz         @relation(fields: [quizId], references: [id])
    quizId    String
    answers   Answer[]
    createdAt DateTime     @default(now())
    updatedAt DateTime     @updatedAt
  }
  
  model Answer {
    id         String   @id @default(cuid())
    title      String
    isCorrect  Boolean
    question   Question @relation(fields: [questionId], references: [id])
    questionId String
    createdAt  DateTime @default(now())
    updatedAt  DateTime @updatedAt
  }
  
  model Category {
    id        String   @id @default(cuid())
    quizzes   Quiz[]   @relation("CategoryQuizzes")
    title     String
    desc      String?
    img       String?
    slug      String
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
   `

export const generateAiQuiz = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt + promptGuideLine }],
    })

    const quiz = response.choices[0].message.content
    if (quiz) return cleanUpContent(quiz)
  } catch (error) {
    console.error('Error generating quiz:', error)
    throw new Error('Failed to generate quiz')
  }
}
