import { answerButtonColors } from "@/lib/constants/answerButtonColors";
import { cn } from "@/lib/utils";
import { Answer } from "@prisma/client";
import { Reorder } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Ensure you have Button component
import { UserAnswer } from "../Game";
import BottomNavbar from "@/components/layouts/BottomNavbar";

type SortableAnswerProps = {
  answers: UserAnswer[];
  index: number;
  checkSortedAnswer: (
    sortedOrder: { id: string; originalIndex: number }[],
  ) => void;
  isCorrect: boolean;
  isIncorrect: boolean;
  isTimeout: boolean;
};

const SortableAnswer = ({
  answers,
  index,
  checkSortedAnswer,
  isCorrect,
  isIncorrect,
  isTimeout,
}: SortableAnswerProps) => {
  const [sortableAnswers, setSortableAnswers] = useState(answers);

  const handleSubmit = () => {
    checkSortedAnswer(
      sortableAnswers as { id: string; originalIndex: number }[],
    );
  };
  useEffect(() => {
    setSortableAnswers(answers);
  }, [answers, setSortableAnswers]);
  return (
    <div className="w-full">
      <Reorder.Group
        values={sortableAnswers}
        onReorder={setSortableAnswers}
        className="grid w-full grid-cols-1 gap-3 sm:justify-center"
      >
        {sortableAnswers &&
          sortableAnswers.map((answer: UserAnswer, index: number) => (
            <Reorder.Item key={answer.id} value={answer}>
              <div
                className={cn(
                  `flex min-h-[84px] items-center rounded-md p-7 text-xl text-white shadow-[0px_5px_0px_0px_#00000024] sm:justify-center sm:text-center`,
                  answerButtonColors[index].background,
                  answerButtonColors[index].shadow,
                )}
              >
                {answer.title}
              </div>
            </Reorder.Item>
          ))}
      </Reorder.Group>
      {!isCorrect && !isIncorrect && !isTimeout ? (
        <BottomNavbar className="left-1/2 w-full -translate-x-1/2 sm:w-fit md:bottom-10 md:rounded-full md:border-0">
          <Button onClick={handleSubmit} size="xl">
            Potwierdź odpowiedź
          </Button>
        </BottomNavbar>
      ) : null}
    </div>
  );
};

export default SortableAnswer;
