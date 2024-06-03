"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { questionsProps, quizProps } from "@/types/data";
import { CheckCircle2, UserRound } from "lucide-react";
import { formatNumber, sliceArrayByPercentage } from "@/lib/utils";

const SmallQuizBlock = ({
  quiz,
  email,
}: {
  quiz: quizProps;
  email: string | undefined;
}) => {
  const [userScore, setUserScore] = useState<number>();
  let quizMaxPoints = 0;
  const slicedArr = sliceArrayByPercentage(
    quiz.questions,
    quiz.questionsPercent,
  );
  slicedArr &&
    slicedArr.forEach((question: questionsProps) => {
      quizMaxPoints += question.points;
    });

  useEffect(() => {
    const userQuiz = quiz.records?.find((record) => record.email == email);

    if (userQuiz) {
      setUserScore(userQuiz.score);
    }
  }, [userScore, email]);
  return (
    <div className="relative flex h-[180px] w-full items-center justify-center sm:h-[240px] md:h-[200px] lg:h-[280px]">
      <Link
        href={`/quizes/${quiz.slug}`}
        className={`p4 group relative col-span-1 block h-full w-full gap-2 overflow-hidden rounded-xl text-center text-2xl text-white flex-col${
          !quiz.img && "bg-slate-800"
        }`}
      >
        <div className="relative h-2/3 w-full">
          {quiz.img && (
            <Image
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              blurDataURL={typeof quiz.img == "string" ? quiz.img : ""}
              placeholder="blur"
              src={typeof quiz.img == "string" ? quiz.img : ""}
              fill
              alt={quiz.title}
              className="object-cover duration-300 group-hover:scale-125"
            />
          )}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-xl bg-slate-900 px-1 text-xs">
            <UserRound size={12} strokeWidth={2} />{" "}
            {formatNumber(quiz.playCount)}
          </div>

          {email && (
            <div className="absolute right-2 top-2 flex items-center gap-1 rounded-xl bg-slate-900 px-1 text-xs">
              {userScore ? (
                userScore < quizMaxPoints ? (
                  <p>{((userScore / quizMaxPoints) * 100).toFixed()}%</p>
                ) : (
                  <CheckCircle2 size={20} className="my-1" />
                )
              ) : (
                <p>Nowy</p>
              )}
            </div>
          )}
        </div>
        {/* {title && <div className="w-full h-1/3 bg-slate-900 ">{title}</div>} */}
        {quiz.title && (
          <div
            className={`absolute bottom-0 left-0 flex h-[34%] w-full items-center justify-start bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 px-2 text-left text-base`}
          >
            <p className="hidden md:block">{quiz.title}</p>
            <p
              className={`block md:hidden ${
                quiz.title.length > 20 && "text-xs"
              }`}
            >
              {quiz.title}
            </p>
          </div>
        )}
      </Link>
      {/* <EditQuizButton
        slug={slug}
        categorySlug={categorySlug}
        quizAuthor={author}
      /> */}
    </div>
  );
};

export default SmallQuizBlock;
