import { answerButtonColors } from "@/lib/constants/answerButtonColors";
import { questionsTypes } from "@/lib/constants/questionsTypes";
import { QuestionWithAnswers } from "@/types/extended";
import { QuestionType } from "@prisma/client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
type AddQuestionBlockProps = {
  addNewQuestion: (newQuestion: QuestionWithAnswers) => void;
  quizId: string;
};

const AddQuestionBlock = ({
  addNewQuestion,
  quizId,
}: AddQuestionBlockProps) => {
  const addQuestionHandler = (questionType: QuestionType) => {
    const questionId = uuidv4();

    const newQuestion: QuestionWithAnswers = {
      id: questionId,
      title: "",
      color: "",
      points: 20,
      answers: [
        {
          id: uuidv4(),
          title: "",
          img: "",
          isCorrect: true,
          questionId: questionId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      time: 20,
      img: "",
      type: questionType,
      quizId: quizId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (questionType === "trueOrFalse") {
      newQuestion.answers.push({
        id: uuidv4(),
        title: "",
        img: "",
        isCorrect: false,
        questionId: questionId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    addNewQuestion(newQuestion);
  };

  return (
    <div className="w-full rounded-xl border p-4">
      <h1 className="pb-2 text-center text-2xl font-semibold">
        Dodaj nowe pytanie
      </h1>
      <div className="mt-2 grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
        {questionsTypes.map((type, index) => (
          <div
            key={index}
            onClick={() => addQuestionHandler(type.value)}
            className="col-span-1 flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-secondary p-6"
          >
            {<type.icon size={40} className={answerButtonColors[index].text} />}
            <h1 className="text-center text-xl font-bold">{type.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddQuestionBlock;
