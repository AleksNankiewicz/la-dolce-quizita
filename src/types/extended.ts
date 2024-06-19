import {
  Answer,
  Collection,
  Question,
  Quiz,
  Record,
  User,
} from "@prisma/client";

export interface QuestionWithAnswers extends Question {
  answers: Answer[];
}

export interface ExtendedQuiz extends Quiz {
  questions: QuestionWithAnswers[];
  records: Record[];
  collections: Collection[];
}

export interface QuizWithQuestions extends Quiz {
  questions: Question[];
}
export interface QuizWithQuestionsAndAuthor extends Quiz {
  questions: Question[];
  author: User;
}
