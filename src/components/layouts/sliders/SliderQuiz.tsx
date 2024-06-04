"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { CheckCircle, CheckCircle2, UserRound } from "lucide-react";
import { formatNumber, sliceArrayByPercentage } from "@/lib/utils";
import { QuizesPlayedProps, questionsProps, quizProps } from "@/types/data";
import "keen-slider/keen-slider.min.css";
import { QuizWithQuestions } from "@/types/extended";
const SliderQuiz = ({
  quiz,
  email,
}: {
  quiz: QuizWithQuestions;
  email: string | undefined;
}) => {
  const [userScore, setUserScore] = useState<number>();

  let quizMaxPoints = 0;
  const slicedArr = sliceArrayByPercentage(
    quiz.questions,
    quiz.questionsPercent,
  );
  slicedArr.forEach((question: questionsProps) => {
    quizMaxPoints += question.points;
  });

  return (
    <div className="keen-slider__slide relative my-3 flex h-[200px] rounded-xl border shadow-[0px_6px_0px_0px_#666] shadow-gray-100 dark:shadow-slate-800">
      <Link
        href={`/quizzes/${quiz.slug}`}
        className={`group relative col-span-1 block h-full w-full gap-2 overflow-hidden rounded-xl text-center text-2xl flex-col${
          !quiz.img && "bg-slate-800"
        }`}
      >
        <div className="relative h-3/5 w-[full]">
          {quiz.img && (
            <Image
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              blurDataURL={typeof quiz.img == "string" ? quiz.img : ""}
              placeholder="blur"
              src={typeof quiz.img == "string" ? quiz.img : ""}
              fill
              alt={quiz.title}
              className="overflow-hidden object-cover duration-300 group-hover:scale-125"
            />
          )}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md bg-primary p-2 text-xs text-white">
            <p>{quiz.questions.length} Pyt</p>
          </div>
        </div>

        {quiz.title && (
          <div
            className={`absolute bottom-0 left-0 h-2/5 w-full bg-background p-4 dark:bg-slate-900`}
          >
            <p className="line-clamp-2 text-left text-xl font-medium">
              {quiz.title}
            </p>
          </div>
        )}
      </Link>
    </div>
  );
};

export default SliderQuiz;
