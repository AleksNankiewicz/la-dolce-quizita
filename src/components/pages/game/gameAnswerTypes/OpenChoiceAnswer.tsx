import BottomNavbar from "@/components/layouts/BottomNavbar";
import ContentEditable from "@/components/ui/ContentEditable";
import { Button } from "@/components/ui/button";
import { Answer } from "@prisma/client";
import React, { useEffect, useState } from "react";

type OpenChoiceProps = {
  answers: Answer[];
  index: number;
  checkAnswer: (answerId: string, isCorrectAnswer: boolean) => void;
  isCorrect: boolean;
  isIncorrect: boolean;
  isTimeout: boolean;
};

const OpenChoiceAnswer = ({
  answers,
  index,
  checkAnswer,
  isCorrect,
  isIncorrect,
  isTimeout,
}: OpenChoiceProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const checkAnswerHandler = () => {
    const formattedInputValue = inputValue.trim().toLowerCase(); // Convert to lowercase and trim whitespace
    const answer = answers.find(
      (answer) => answer.title.trim().toLowerCase() === formattedInputValue,
    );
    if (answer) {
      checkAnswer(answer.id, true); // Assuming answer.id is the correct answer's ID
    } else {
      checkAnswer("", false); // Set error message for incorrect answer
    }
  };

  const handleGlobalKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !isInputEmpty) {
      checkAnswerHandler();
    }
  };

  useEffect(() => {
    setInputValue("");
    setIsInputEmpty(true);
  }, [answers]); // Ensure isInputEmpty is managed separately if it's not intended to be a dependency

  useEffect(() => {
    setIsInputEmpty(true); // Reset isInputEmpty separately
  }, [answers]); // Re-register event listener if answers change

  useEffect(() => {
    window.addEventListener("keydown", handleGlobalKeyDown); // Add event listener on component mount
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown); // Clean up event listener on component unmount
    };
  });

  return (
    <div className="grid w-full grid-cols-1 justify-center gap-3">
      <ContentEditable
        className="relative flex min-h-[84px] items-center rounded-md bg-black p-7 text-center text-xl text-white shadow-[0px_5px_0px_0px_#00000024] sm:justify-center"
        value={inputValue}
        onChange={() => {
          setIsInputEmpty(false);
        }}
        onBlur={setInputValue}
      />
      {!isInputEmpty && !isCorrect && !isIncorrect && !isTimeout ? (
        <BottomNavbar className="left-1/2 -translate-x-1/2 sm:w-fit md:bottom-10 md:rounded-full md:border-0">
          <Button onClick={checkAnswerHandler} size="xl">
            Potwierdź odpowiedź
          </Button>
        </BottomNavbar>
      ) : null}
    </div>
  );
};

export default OpenChoiceAnswer;
