// src/components/EditQuizNavbar.tsx
import Link from "next/link";
import React, { useEffect } from "react";
import { Eye, Plus, Settings, X } from "lucide-react";

import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

import { Button } from "@/components/ui/button";
import { Collection, QuestionType, Quiz } from "@prisma/client";
import { AddQuestionDialog } from "./AddQuestionDialog";
import useNavbarStore from "@/lib/store/useNavbarStore";
import EditQuizInfoDialog from "./EditQuizInfoDialog";
import { ExtendedQuiz, QuestionWithAnswers } from "@/types/extended";
import { Tooltip } from "@radix-ui/react-tooltip";
import TooltipButton from "@/components/ui/TooltipButton";

type EditQuizNavbarProps = {
  addQuestion: (newQuestion: QuestionWithAnswers) => void;
  saveQuiz: () => void;
  isSaving: boolean;
  setQuiz: (quiz: ExtendedQuiz) => void;
  allCollections: Collection[];
  quiz: ExtendedQuiz;
  isNewQuiz: boolean;
  quizSlug: string;
};

const EditQuizNavbar = ({
  addQuestion,
  saveQuiz,
  isSaving,
  quiz,
  setQuiz,
  isNewQuiz,
  quizSlug,
  allCollections,
}: EditQuizNavbarProps) => {
  const setNavbarComponents = useNavbarStore(
    (state) => state.setNavbarComponents,
  );

  useEffect(() => {
    setNavbarComponents([
      <div
        className="flex w-full flex-1 items-center justify-between gap-4"
        key="right"
      >
        <EditQuizInfoDialog
          allCollections={allCollections}
          quiz={quiz}
          setQuiz={setQuiz}
        />
        {!isNewQuiz && (
          <Link href={`/game/${quizSlug}`}>
            <Eye size={30} />
          </Link>
        )}
        <div className="hidden gap-4 md:flex">
          <AddQuestionDialog addNewQuestion={addQuestion} quizId={quiz.id} />
          <TooltipButton content={!quiz.title && "Quiz musi mieć tytuł"}>
            <div className="pointer-events-auto cursor-pointer">
              <Button
                disabled={!quiz.title || isSaving}
                variant={"secondary"}
                onClick={saveQuiz}
                className=""
              >
                Zapisz
              </Button>
            </div>
          </TooltipButton>
        </div>
      </div>,
    ]);
  }, [addQuestion, saveQuiz, isNewQuiz, setNavbarComponents]);

  return null;
};

export default EditQuizNavbar;
