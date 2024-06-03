import QuizBlock from "@/components/layouts/blocks/QuizBlock/QuizBlock";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowUpDown } from "lucide-react";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
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
  });

  return (
    <div className="">
      <div className="flex justify-between py-10">
        <h1 className="text-2xl font-semibold">
          Ulubione ({favoritesQuizzes.length})
        </h1>
        <div className="flex gap-2 text-xl font-semibold text-purple-500">
          <p className="">Najowsze</p>
          <ArrowUpDown />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {favoritesQuizzes.map((quiz) => (
          <QuizBlock key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default page;
