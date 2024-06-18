import React, { useState, useEffect, useRef } from "react";
import { Button, buttonVariants } from "../../../ui/button";
import { answerButtonColors } from "@/lib/constants/answerButtonColors";
import EditAnswearDialog from "../EditAnswearDialog";
import { v4 as uuidv4 } from "uuid";
import AddAnswearDialog from "../AddAnswerDialog";
import ContentEditable from "../../../ui/ContentEditable";
import { Answer, QuestionType } from "@prisma/client";
import { QuestionWithAnswers } from "@/types/extended";
import { Reorder, motion } from "framer-motion";
import ImageInput from "@/components/layouts/inputs/ImageInput";
import {
  cn,
  errorQuestionTypeTranslations,
  getQuestionDescription,
  getQuestionTypeTranslation,
} from "@/lib/utils";
import { GradientPicker } from "@/components/ui/GradientPicker";
import QuestionTimeDialog from "./QuestionTimeDialog";
import QuestionPointsDialog from "./QuestionPointsDialog";
import TooltipButton from "@/components/ui/TooltipButton";
import { Copy, ImagePlusIcon, Info, Plus, Trash } from "lucide-react";
import { TQuestionError, TQuestionErrorTypes } from "@/types/TQuestionsTypes";

type EditableQuestionProps = {
  question: QuestionWithAnswers;
  index: number;
  addNewQuestion: (newQuestion: QuestionWithAnswers) => void;
  deleteQuestion: (id: string) => void;
  editQuestion: (updatedQuestion: QuestionWithAnswers) => void;
  errors?: TQuestionError["errorTypes"];
  deleteError: (index: number, errorType: TQuestionErrorTypes) => void;
};

const EditableQuestion: React.FC<EditableQuestionProps> = ({
  question,
  index,
  addNewQuestion,
  deleteQuestion,
  editQuestion,
  deleteError,
  errors = [],
}) => {
  const [answers, setAnswers] = useState<Answer[]>(question.answers || []);
  const [imgInputId, setImgInputId] = useState(uuidv4());
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length > 0 && questionRef.current) {
      questionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [errors]);

  const addAnswer = (title: string, isCorrect: boolean) => {
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
    deleteError(index, "noAnswers");
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
    if (updatedAnswer.isCorrect) {
      deleteError(index, "noCorrectAnswer");
    }
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

  const duplicateQuestionHandler = () => {
    const updatedAnswers = question.answers.map((answer) => ({
      ...answer,
      id: uuidv4(),
    }));
    addNewQuestion({
      ...question,
      id: uuidv4(),
      answers: updatedAnswers,
    });
  };

  return (
    <motion.div
      ref={questionRef}
      exit={{ scale: 0 }}
      transition={{ duration: 0.2 }}
      key={question.id}
      id={question.id}
      className={cn(
        `relative col-span-2 flex w-full flex-col items-center justify-evenly gap-3 rounded-xl border-2 p-4 text-center transition-transform duration-200`,
        errors.length > 0 ? "border-red-500" : "",
      )}
    >
      {errors.length > 0 && (
        <div className="w-full text-left text-red-500">
          {errors.map((error, idx) => (
            <React.Fragment key={idx}>
              {errorQuestionTypeTranslations[error]}
              {idx !== errors.length - 1 && ", "}
            </React.Fragment>
          ))}
        </div>
      )}
      <div className="flex flex-1 items-center justify-center gap-2 md:hidden">
        <h1 className="text-center text-xl font-bold">
          {getQuestionTypeTranslation(question.type)}
        </h1>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-1 gap-3 text-white">
          <QuestionTimeDialog time={question.time} editTime={editTime} />
          <QuestionPointsDialog
            points={question.points}
            editPoints={editPoints}
          />
        </div>

        <div className="hidden flex-1 flex-row items-center justify-center gap-2 text-center text-xl font-bold md:flex">
          <h1>{getQuestionTypeTranslation(question.type)}</h1>
          <TooltipButton content={getQuestionDescription(question.type)}>
            <Info size={17} />
          </TooltipButton>
        </div>
        <div className="flex flex-1 justify-end gap-4">
          <TooltipButton content="Wybierz kolor">
            <div className="">
              <GradientPicker
                className={cn(
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
          <TooltipButton content="Duplikuj">
            <Button
              variant={"outline"}
              onClick={duplicateQuestionHandler}
              className={
                "absolute left-0 translate-y-[-115%] rounded-full border-0 border-primary px-3 text-primary sm:static sm:translate-y-0 sm:border-2"
              }
            >
              <Copy />
            </Button>
          </TooltipButton>
          <TooltipButton content="Usuń">
            <Button
              variant={"outline"}
              onClick={() => deleteQuestion(question.id)}
              className={
                "absolute right-0 translate-y-[-115%] rounded-full border-0 border-primary px-3 text-primary sm:static sm:translate-y-0 sm:border-2"
              }
            >
              <Trash />
            </Button>
          </TooltipButton>
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
          centerCursor
          className="flex w-full items-center justify-center rounded-xl bg-muted p-4 py-5 text-left text-xl font-semibold sm:text-center md:min-h-full"
          onBlur={(title) => {
            editQuestion({ ...question, title });
            if (title) {
              deleteError(index, "noTitle");
            }
          }}
          placeholder="Tu wpisz pytanie"
          value={question.title}
        />
      </div>
      {question.type == "sortable" ? (
        <Reorder.Group
          values={answers}
          onReorder={setAnswers}
          className="grid w-full grid-cols-1 gap-3 sm:justify-center"
        >
          {answers &&
            answers.map((answer: Answer, index: number) => (
              <Reorder.Item key={answer.id} value={answer}>
                <EditAnswearDialog
                  questionType={question.type}
                  answer={answer}
                  editAnswer={editAnswer}
                  deleteAnswer={deleteAnswer}
                  color={answerButtonColors[index]}
                />
              </Reorder.Item>
            ))}

          <Button
            onClick={() => addAnswer("", false)}
            className="col-span-1 hidden min-h-[84px] py-7 text-xl md:flex"
          >
            <Plus />
          </Button>
        </Reorder.Group>
      ) : (
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:justify-center">
          {answers &&
            answers.map((answer: Answer, index: number) => (
              <EditAnswearDialog
                questionType={question.type}
                answer={answer}
                editAnswer={editAnswer}
                deleteAnswer={deleteAnswer}
                key={answer.id}
                color={answerButtonColors[index]}
              />
            ))}

          {question.type !== "trueOrFalse" && (
            <Button
              onClick={() => addAnswer("", false)}
              className="col-span-1 hidden min-h-[84px] py-7 text-xl md:flex"
            >
              <Plus />
            </Button>
          )}
        </div>
      )}
      {question.type !== "trueOrFalse" && (
        <AddAnswearDialog
          questionType={question.type}
          addAnswer={addAnswer}
          color={answerButtonColors[answers.length]}
        />
      )}
    </motion.div>
  );
};

export default EditableQuestion;
