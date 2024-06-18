import { getQuestionTypeTranslation } from "@/lib/utils";

import { Question } from "@prisma/client";

import Image from "next/image";
import React from "react";

const QuestionBlock = ({
  question,
  index,
}: {
  question: Question;
  index: number;
}) => {
  return (
    <div className="flex min-h-[121px] overflow-hidden rounded-2xl border">
      <div className="flex w-full flex-col gap-3 p-3">
        <p className="line-clamp-1">
          <span>{index} - </span>
          {getQuestionTypeTranslation(question.type)}
        </p>
        <h1 className="text-xl font-semibold">{question.title}</h1>
      </div>
      {question.img ? (
        <div className="relative min-w-[35%]">
          <Image
            alt={`zdjęcie quizu`}
            className="object-contain"
            src={question.img}
            fill
          />
        </div>
      ) : null}
    </div>
  );
};

export default QuestionBlock;
