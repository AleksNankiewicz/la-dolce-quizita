"use client";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import EditableQuestion from "./Questions/EditableQuestion";
import { v4 as uuidv4 } from "uuid";
import { cn, handleScrollToBottom, sliceArrayByPercentage } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ExtendedQuiz, QuestionWithAnswers } from "@/types/extended";
import { Collection, Question } from "@prisma/client";
import { AddQuestionDialog } from "./AddQuestionDialog";
import EditQuizNavbar from "./EditQuizNavbar";
import { toast } from "sonner";
import { TQuestionError, TQuestionErrorTypes } from "@/types/TQuestionsTypes";
import { saveQuiz } from "@/lib/editQuiz/saveQuiz";
import AddQuestionBlock from "./AddQuestionBlock";

type EditQuizFormProps = {
  initialQuiz: ExtendedQuiz;
  userId: string;
  collections: Collection[];
};

const EditQuizForm: React.FC<EditQuizFormProps> = ({
  initialQuiz,
  userId,
  collections,
}) => {
  const [quiz, setQuiz] = useState<ExtendedQuiz>(initialQuiz);
  const pathName = usePathname();
  const [allCollections, setAllCollections] =
    useState<Collection[]>(collections);
  const [questions, setQuestions] = useState<QuestionWithAnswers[]>(
    quiz.questions,
  );

  const [editableQuestionsRef, setEditableQuestionsRef] = useState<
    Array<React.RefObject<HTMLDivElement>>
  >(questions.map(() => React.createRef<HTMLDivElement>()));
  const [errorQuestions, setErrorQuestions] = useState<TQuestionError[]>([]);

  const deleteError = (
    questionIndex: number,
    errorType: TQuestionErrorTypes,
  ) => {
    setErrorQuestions((prevErrors) => {
      const updatedErrors = prevErrors.map((error) => {
        if (error.questionIndex === questionIndex) {
          return {
            ...error,
            errorTypes: error.errorTypes.filter(
              (et) => et !== (errorType as unknown),
            ),
          };
        }
        return error;
      });

      return updatedErrors.filter((error) => error.errorTypes.length > 0);
    });
  };

  const addNewQuestion = (newQuestion: QuestionWithAnswers) => {
    setQuestions([...questions, newQuestion]);
    setTimeout(() => {
      handleScrollToBottom();
    }, 10);
  };

  const editQuestion = (updatedQuestion: QuestionWithAnswers) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question,
      ),
    );
  };

  const deleteQuestion = (id: string) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  const handleSaveQuiz = async () => {
    try {
      await saveQuiz({
        quiz,
        userId,
        pathName,
        questions,
        editableQuestionsRef,
        setErrorQuestions,
      });
    } catch (err) {
      console.error("Error saving quiz:", err);
      toast.dismiss();
      toast("Nie udało się zapisać quizu!", {
        icon: "😢",
      });
    }
  };

  return (
    <>
      <EditQuizNavbar
        quizSlug={quiz.slug}
        isNewQuiz={pathName.includes("newQuiz")}
        addQuestion={addNewQuestion}
        saveQuiz={handleSaveQuiz}
        quiz={quiz}
        setQuiz={setQuiz}
        allCollections={allCollections}
      />
      <main className="flex w-full flex-col gap-3 py-4 pb-24">
        {questions.length != 0 && (
          <h1 className="text-xl font-semibold">
            Pytania (
            {sliceArrayByPercentage(questions, quiz.questionsPercent).length})
          </h1>
        )}

        <AnimatePresence>
          {questions.map((question: QuestionWithAnswers, index: number) => {
            const questionErrors = errorQuestions.find(
              (qe) => qe.questionIndex === index,
            );
            const errors = questionErrors ? questionErrors.errorTypes : [];

            return (
              <React.Fragment key={question.id}>
                <EditableQuestion
                  question={question}
                  index={index}
                  key={question.id}
                  addNewQuestion={addNewQuestion}
                  deleteQuestion={deleteQuestion}
                  editQuestion={editQuestion}
                  errors={errors} // Pass array of error types
                  deleteError={deleteError}
                />
              </React.Fragment>
            );
          })}
        </AnimatePresence>
        {questions.length == 0 && (
          <AddQuestionBlock addNewQuestion={addNewQuestion} quizId={quiz.id} />
        )}

        <div className="fixed bottom-0 left-0 flex w-full gap-4 bg-background p-4 md:hidden">
          <Button
            onClick={handleSaveQuiz}
            className={cn(
              buttonVariants({
                variant: "secondary",
              }),
              "flex-1 rounded-full p-6 text-xl font-bold text-primary",
            )}
          >
            Zapisz
          </Button>

          <AddQuestionDialog
            className="flex-1 rounded-full p-6 text-xl font-bold"
            addNewQuestion={addNewQuestion}
            quizId={quiz.id}
          />
        </div>
      </main>
    </>
  );
};

export default EditQuizForm;
