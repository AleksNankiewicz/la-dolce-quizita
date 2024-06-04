import React from "react";
import { db } from "@/lib/db";
import { getBlankQuiz } from "@/lib/actions/getBlankQuiz";
import EditQuizForm from "@/components/pages/editQuiz/EditQuizForm";
import { ExtendedQuiz } from "@/types/extended";
import { auth } from "@/auth";

type Params = {
  params: { slug: string };
};

const EditQuizPage = async ({ params }: Params) => {
  const { slug } = params;
  const session = await auth();

  const user = session?.user;

  let quiz = (await db.quiz.findFirst({
    where: { slug },
    include: {
      questions: { include: { answers: true } },
      collections: true,
      records: true,
    },
  })) as ExtendedQuiz | undefined;

  if (!quiz) {
    quiz = await getBlankQuiz(user?.id as string);

    if (!quiz) return null;
  }

  const questions = quiz.questions || [];
  if (!user) return;

  return <EditQuizForm initialQuiz={quiz} userId={user.id as string} />;
};

export default EditQuizPage;
