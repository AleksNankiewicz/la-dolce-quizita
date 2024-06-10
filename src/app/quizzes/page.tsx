"use server";

import QuizBlock from "@/components/layouts/blocks/QuizBlock/QuizBlock";
import { db } from "@/lib/db";

import React from "react";

const Page = async () => {
  // Assuming getQuizes() returns an array of quiz objects

  const quizzes = await db.quiz.findMany({ include: { questions: true } });

  return (
    <div className="flex flex-col gap-4">
      {quizzes.map((quiz) => (
        <QuizBlock quiz={quiz} key={quiz.id} />
      ))}
    </div>
  );
};

export default Page;
