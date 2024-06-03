import React from "react";

import { db } from "@/lib/db";
import Game from "@/components/pages/game/Game";
import { shuffleArray } from "@/lib/utils";

const SingleGamePage = async ({ params }: any) => {
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
  const shuffledQuestions = shuffleArray(quiz.questions);
  const shuffledQuiz = {
    ...quiz,
    questions: shuffledQuestions.map((question) => ({
      ...question,
      answers: shuffleArray(question.answers),
    })),
  };
  return <Game quiz={shuffledQuiz} />;
};

export default SingleGamePage;
