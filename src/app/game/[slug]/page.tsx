import React from "react";

import { db } from "@/lib/db";
import Game from "@/components/pages/game/Game";
import { shuffleArray } from "@/lib/utils";
import { auth } from "@/auth";
import { User } from "@prisma/client";

const SingleGamePage = async ({ params }: any) => {
  const session = await auth();

  const authUser = session?.user as User;

  const { slug } = params;
  const quiz = await db.quiz.findFirst({
    where: {
      slug: slug,
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
      collections: true,
      records: true,
    },
  });

  if (!quiz) return;

  // Add original index to each answer
  const quizWithOriginalIndex = {
    ...quiz,
    questions: quiz.questions.map((question) => ({
      ...question,
      answers: question.answers.map((answer, index) => ({
        ...answer,
        originalIndex: index,
      })),
    })),
  };

  // Shuffle questions and answers
  const shuffledQuestions = shuffleArray(quizWithOriginalIndex.questions);
  const shuffledQuiz = {
    ...quizWithOriginalIndex,
    questions: shuffledQuestions.map((question) => ({
      ...question,
      answers: shuffleArray(question.answers),
    })),
  };

  return <Game quiz={shuffledQuiz} user={authUser} />;
};

export default SingleGamePage;
