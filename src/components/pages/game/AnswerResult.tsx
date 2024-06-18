import { QuestionWithAnswers } from "@/types/extended";
import React from "react";
import { UserAnswer } from "./Game";
import Image from "next/image";
import { Check, CheckCircle2Icon, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type AnswerResultProps = {
  question: QuestionWithAnswers;
  userAnswer: UserAnswer | undefined;
  className?: string;
};

const AnswerResult = ({
  question,
  userAnswer,
  className,
}: AnswerResultProps) => {
  return (
    <div
      className={cn(
        "flex min-h-[121px] overflow-hidden rounded-2xl border",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-3 p-3">
        <div className="flex items-center justify-between">
          <h1 className="line-clamp-2 text-xl font-semibold">
            {question.title}
          </h1>
          {userAnswer ? (
            userAnswer.isCorrect ? (
              <CheckCircle2Icon className="text-green-500" />
            ) : (
              <XCircle className="text-red-500" />
            )
          ) : (
            <XCircle className="text-red-500" />
          )}
        </div>

        <div className="grid grid-cols-2 text-sm">
          {question.answers.map((answer) => (
            <div key={answer.id} className="flex items-center gap-1">
              <p>{answer.title}</p>
              {question.type !== "openEnded" && question.type !== "sortable" ? (
                <>
                  {answer.isCorrect ? (
                    <Check size={15} className="text-green-400" />
                  ) : (
                    <X size={15} className="text-red-500" />
                  )}
                  d
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {question.img ? (
        <div className="relative min-w-[35%]">
          <Image
            alt={`zdjęcie pytania`}
            className="object-contain"
            src={question.img}
            fill
          />
        </div>
      ) : null}
    </div>
  );
};

export default AnswerResult;
