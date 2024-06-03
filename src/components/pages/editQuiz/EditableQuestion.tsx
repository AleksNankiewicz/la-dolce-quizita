import { ImagePlusIcon, Plus, Trash } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";

import { answearProps, questionsProps } from "@/types/data";
import { Button } from "../../ui/button";

import { Input } from "../../ui/input";

import { answerButtonColors } from "@/lib/constants/answerButtonColors";
import { Badge } from "../../ui/badge";
import QuestionTimeDialog from "./QuestionTimeDialog";
import EditAnswearDialog from "./EditAnswearDialog";
import { v4 as uuidv4 } from "uuid";
import QuestionPointsDialog from "./QuestionPointsDialog";
import AddAnswearDialog from "./AddAnswearDialog";
import ContentEditable from "../../ui/ContentEditable";
import { Answer, Question } from "@prisma/client";
import { QuestionWithAnswers } from "@/types/extended";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageInput from "@/components/layouts/inputs/ImageInput";

type EditableQuestionProps = {
  question: QuestionWithAnswers;
  index: string;

  deleteQuestion: (id: string) => void;

  editQuestion: (updatedQuestion: QuestionWithAnswers) => void;
};
const EditableQuestion = ({
  question,
  index,

  deleteQuestion,

  editQuestion,
}: EditableQuestionProps) => {
  const [answers, setAnswers] = useState<Answer[]>(question.answers || []);

  // const [imagePreview, setImagePreview] = useState<string | null>(question.img)

  const addAnswear = (title: string, isCorrect: boolean) => {
    const newAnswer: Answer = {
      id: uuidv4(),
      questionId: question.id,
      title: title,
      img: "",
      isCorrect: isCorrect,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    const updatedQuestion: QuestionWithAnswers = {
      ...question,
      answers: updatedAnswers,
    };
    editQuestion(updatedQuestion);
  };

  const editAnswer = (updatedAnswer: Answer) => {
    const updatedAnswers = answers.map((answer) =>
      answer.id === updatedAnswer.id ? updatedAnswer : answer,
    );
    setAnswers(updatedAnswers);
    const updatedQuestion: QuestionWithAnswers = {
      ...question,
      answers: updatedAnswers,
    };
    editQuestion(updatedQuestion);
  };

  const deleteAnswer = (id: string) => {
    const updatedAnswers = answers.filter((answer) => answer.id !== id);
    setAnswers(updatedAnswers);
    const updatedQuestion: QuestionWithAnswers = {
      ...question,
      answers: updatedAnswers,
    };
    editQuestion(updatedQuestion);
  };
  const editTime = (time: number) => {
    const updatedQuestion = { ...question, time };
    editQuestion(updatedQuestion);
  };
  const editPoints = (points: number) => {
    const updatedQuestion = { ...question, points };
    editQuestion(updatedQuestion);
  };

  return (
    <motion.div
      exit={{ scale: 0 }}
      transition={{
        duration: 0.2,
      }}
      key={question.id}
      id={question.id}
      className={`relative col-span-2 flex w-full flex-col items-center justify-evenly gap-3 rounded-xl border-2 p-4 text-center`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-1 gap-3 text-white">
          <QuestionTimeDialog time={question.time} editTime={editTime} />
          <QuestionPointsDialog
            points={question.points}
            editPoints={editPoints}
          />
        </div>

        <h1 className="hidden flex-1 text-center text-xl font-bold md:block">
          {question.type}
        </h1>
        <div className="flex flex-1 justify-end gap-4">
          <Tooltip>
            <TooltipTrigger>
              <Badge
                onClick={() => deleteQuestion(question.id)}
                className={"border-2 border-primary bg-background text-primary"}
              >
                <Trash className="dark:text-white" />
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Usuń pytanie</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <ImageInput
          image={question.img}
          onImageChange={(image) =>
            editQuestion({
              ...question,
              img: image as unknown as string,
            })
          }
          placeholder="Dodaj zdjęcie pytania "
          className="aspect-video"
          containerClassName="w-full"
        />

        <ContentEditable
          className="flex w-full items-center justify-center rounded-xl bg-muted p-4 py-5 text-left text-xl font-semibold md:min-h-full"
          onBlur={(title) => editQuestion({ ...question, title })}
          placeholder="Tu wpisz pytanie"
          value={question.title}
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:justify-center">
        {answers &&
          answers.map((answer: Answer, index: number) => (
            <EditAnswearDialog
              answer={answer}
              editAnswer={editAnswer}
              deleteAnswer={deleteAnswer}
              key={answer.id}
              color={answerButtonColors[index]}
            />
          ))}
        <Button
          onClick={() => addAnswear("", false)}
          className="col-span-1 hidden min-h-[84px] py-7 text-xl md:flex"
        >
          <Plus />
        </Button>
      </div>

      <AddAnswearDialog
        addAnswear={addAnswear}
        color={answerButtonColors[answers.length]}
      />
    </motion.div>
  );
};

export default EditableQuestion;
