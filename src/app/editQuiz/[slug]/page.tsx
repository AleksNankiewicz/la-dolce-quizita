import React from "react";
import { db } from "@/lib/db";
import { getBlankQuiz } from "@/lib/actions/getBlankQuiz";
import EditQuizForm from "@/components/pages/editQuiz/EditQuizForm";
import { Quiz, Question } from "@prisma/client";
import { ExtendedQuiz } from "@/types/extended";

type Params = {
  params: { slug: string };
};

const calculateQuizDuration = (questions: Question[]) => {
  const totalTime = questions.reduce((acc, question) => acc + question.time, 0);
  return {
    time: totalTime,
    minutes: Math.floor(totalTime / 60),
    seconds: totalTime % 60,
  };
};

const calculateQuizMaxPoints = (questions: Question[]) => {
  return questions.reduce((acc, question) => acc + question.points, 0);
};

const EditQuizPage = async ({ params }: Params) => {
  const { slug } = params;

  let quiz = (await db.quiz.findFirst({
    where: { slug },
    include: {
      questions: { include: { answers: true } },
      collections: true,
      records: true,
    },
  })) as ExtendedQuiz | undefined;

  if (!quiz) {
    quiz = await getBlankQuiz();
    if (!quiz) return null;
  }

  const questions = quiz.questions || [];
  const quizDuration = calculateQuizDuration(questions);
  const quizMaxPoints = calculateQuizMaxPoints(questions);

  return <EditQuizForm initialQuiz={quiz} />;
};

export default EditQuizPage;
