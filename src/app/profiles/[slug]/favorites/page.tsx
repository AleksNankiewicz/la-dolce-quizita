import QuizBlock from "@/components/layouts/blocks/QuizBlock/QuizBlock";
import ProfileSorting from "@/components/pages/profile/ProfileSorting";
import { db } from "@/lib/db";

import { ArrowUpDown } from "lucide-react";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const { slug } = params;
  const favoritesQuizzes = await db.quiz.findMany({
    where: {
      favoritedBy: {
        some: {
          slug: slug,
        },
      },
    },
    include: {
      questions: true,
      author: true,
    },
  });

  return (
    <div className="">
      <ProfileSorting title="Ulubione" length={favoritesQuizzes.length} />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {favoritesQuizzes.map((quiz) => (
          <QuizBlock key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default page;
