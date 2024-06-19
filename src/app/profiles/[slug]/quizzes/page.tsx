import QuizBlock from "@/components/layouts/blocks/QuizBlock/QuizBlock";
import ProfileSorting from "@/components/pages/profile/ProfileSorting";
import SortingPopover from "@/components/pages/profile/SortingPopover";
import { TSortingOption, sortingOptions } from "@/lib/constants/sortingOptions";
import { db } from "@/lib/db";

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
    include: {
      questions: true,
      author: true,
    },
    orderBy: sortingOption.orderBy,
  });

  return (
    <div className="">
      <ProfileSorting title="Quizy" length={createdQuizzes.length} />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {createdQuizzes.map((quiz) => (
          <QuizBlock key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default page;
