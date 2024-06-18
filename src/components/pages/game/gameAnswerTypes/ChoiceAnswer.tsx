import React from "react";
import cn from "classnames"; // Import classnames library if not already imported
import { Button } from "@/components/ui/button";
import { ExtendedQuiz } from "@/types/extended"; // Adjust the path as per your project structure
import { answerButtonColors } from "@/lib/constants/answerButtonColors";
import { Answer } from "@prisma/client";

type ChoiceAnswerProps = {
  answers: Answer[];
  index: number;
  checkAnswer: (answerId: string, isCorrectAnswer: boolean) => void;
  isCorrect: boolean;
  isIncorrect: boolean;
  isTimeout: boolean;
};

const ChoiceAnswer: React.FC<ChoiceAnswerProps> = ({
  answers,
  index,
  checkAnswer,
  isCorrect,
  isIncorrect,
  isTimeout,
}) => {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:justify-center">
      {answers.map((answer, i) => (
        <Button
          variant="game"
          onClick={() => checkAnswer(answer.id, answer.isCorrect)}
          key={answer.id}
          className={cn(
            (isCorrect || isIncorrect || isTimeout) &&
              (answer.isCorrect
                ? "bg-green-500 shadow-green-600"
                : "bg-red-500 shadow-red-600"),
            !(isCorrect || isIncorrect || isTimeout) &&
              `${answerButtonColors[i].background} ${answerButtonColors[i].shadow}`,
          )}
        >
          {answer.title}
        </Button>
      ))}
    </div>
  );
};

export default ChoiceAnswer;
