"use server";

import { revalidateTag } from "next/cache";
import { db } from "../db";

export const deleteQuiz = async (id: string) => {
  try {
    // Fetch all questions associated with the quiz
    const questions = await db.question.findMany({
      where: {
        quizId: id,
      },
    });

    // Collect all question IDs
    const questionIds = questions.map((question) => question.id);

    // Delete all answers associated with the questions
    await db.answer.deleteMany({
      where: {
        questionId: {
          in: questionIds,
        },
      },
    });

    // Delete all questions associated with the quiz
    await db.question.deleteMany({
      where: {
        quizId: id,
      },
    });

    // Delete the quiz
    await db.quiz.delete({
      where: {
        id: id,
      },
    });

    // Revalidate cache tags
    revalidateTag("quizzes");
    revalidateTag("favorites");
    revalidateTag("profiles");

    console.log("Quiz and all associated questions and answers deleted");
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
