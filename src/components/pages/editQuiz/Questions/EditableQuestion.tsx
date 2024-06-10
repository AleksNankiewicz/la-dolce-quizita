import { ImagePlusIcon, Plus, Trash } from "lucide-react";

import React, { useState } from "react";

import { Button, buttonVariants } from "../../../ui/button";

import { answerButtonColors } from "@/lib/constants/answerButtonColors";

import EditAnswearDialog from "../EditAnswearDialog";
import { v4 as uuidv4 } from "uuid";

import AddAnswearDialog from "../AddAnswearDialog";
import ContentEditable from "../../../ui/ContentEditable";
import { Answer } from "@prisma/client";
import { QuestionWithAnswers } from "@/types/extended";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageInput from "@/components/layouts/inputs/ImageInput";
import { cn, getQuestionTypeTranslation } from "@/lib/utils";
import { GradientPicker } from "@/components/ui/GradientPicker";
import QuestionTimeDialog from "./QuestionTimeDialog";
import QuestionPointsDialog from "./QuestionPointsDialog";
import TooltipButton from "@/components/ui/TooltipButton";

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
  const [imgInputId, setImgInputId] = useState(uuidv4());
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
      // style={question.color ? { backgroundColor: question.color } : {}}
      className={cn(
        `relative col-span-2 flex w-full flex-col items-center justify-evenly gap-3 rounded-xl border-2 p-4 text-center`,
      )}
    >
      <h1 className="flex-1 text-center text-xl font-bold md:hidden">
        {getQuestionTypeTranslation(question.type)}
      </h1>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-1 gap-3 text-white">
          <QuestionTimeDialog time={question.time} editTime={editTime} />
          <QuestionPointsDialog
            points={question.points}
            editPoints={editPoints}
          />
        </div>

        <h1 className="hidden flex-1 text-center text-xl font-bold md:block">
          {getQuestionTypeTranslation(question.type)}
        </h1>
        <div className="flex flex-1 justify-end gap-4">
          <TooltipButton content="Wybierz kolor">
            <div className="">
              <GradientPicker
                className={cn(
                  // badgeVariants(),
                  "flex w-[48px] cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-background text-primary",
                )}
                placeholder=""
                background={question.color || ""}
                setBackground={(color) => {
                  editQuestion({
                    ...question,
                    color: color,
                  });
                }}
              />
            </div>
          </TooltipButton>

          {!question.img && (
            <TooltipButton content="Dodaj zdjęcie">
              <label
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "cursor-pointer rounded-full border-2 border-primary px-3 text-primary",
                )}
                htmlFor={imgInputId}
              >
                <ImagePlusIcon />
              </label>
            </TooltipButton>
          )}

          <TooltipButton content="Usuń pytanie">
            <Button
              variant={"outline"}
              onClick={() => deleteQuestion(question.id)}
              className={
                "rounded-full border-0 border-primary px-3 text-primary sm:border-2"
              }
            >
              <Trash />
            </Button>
          </TooltipButton>
          <Tooltip>
            <TooltipTrigger
              asChild
              className="absolute right-2 top-2 sm:static"
            ></TooltipTrigger>
            <TooltipContent>Usuń pytanie</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <ImageInput
          inputId={imgInputId}
          image={question.img}
          onImageChange={(image) =>
            editQuestion({
              ...question,
              img: image as unknown as string,
            })
          }
          placeholder="Dodaj zdjęcie pytania "
          className="aspect-video"
          containerClassName={cn("w-full", !question.img && "hidden")}
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
