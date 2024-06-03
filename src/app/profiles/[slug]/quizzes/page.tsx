import QuizBlock from "@/components/layouts/blocks/QuizBlock/QuizBlock";
import SortingPopover from "@/components/pages/profile/SortingPopover";
import { TSortingOption, sortingOptions } from "@/lib/constants/sortingOptions";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowUpDown } from "lucide-react";
import React from "react";

type PageProps = {
  params: { slug: string };
  searchParams: {
    sortBy?: TSortingOption;
  };
};

const page = async ({ params, searchParams }: PageProps) => {
  const selectedSortingValue = searchParams.sortBy || "newest";

  const sortingOption = sortingOptions[selectedSortingValue];

  const { slug } = params;
  const createdQuizzes = await db.quiz.findMany({
    where: {
      author: {
        slug: slug,
      },
    },
    orderBy: sortingOption.orderBy,
  });

  return (
    <div className="">
      <div className="flex justify-between py-10">
        <h1 className="text-2xl font-semibold">
          Quizy ({createdQuizzes.length})
        </h1>
        <SortingPopover />
      </div>
      <div className="flex flex-col gap-5">
        {createdQuizzes.map((quiz) => (
          <QuizBlock key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default page;
