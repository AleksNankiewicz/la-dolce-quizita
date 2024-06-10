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
import { ExtendedQuiz } from "@/types/extended";

type EditQuizNavbarProps = {
  addQuestion: (questionType: QuestionType) => void;
  saveQuiz: () => void;
  setQuiz: (quiz: ExtendedQuiz) => void;
  allCollections: Collection[];

  quiz: ExtendedQuiz;
  isNewQuiz: boolean;
  quizSlug: string;
};

const EditQuizNavbar = ({
  addQuestion,
  saveQuiz,
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
      // <div className="flex items-center gap-4" key="left">
      //   <Link href={"/"}>
      //     <X strokeWidth={3} />
      //   </Link>
      //   {isNewQuiz ? (
      //     <h1 className="text-2xl font-bold">Dodaj Quiz</h1>
      //   ) : (
      //     <h1 className="text-2xl font-bold">Edytuj Quiz</h1>
      //   )}
      // </div>,
      <div
        className="flex w-full flex-1 items-center justify-between gap-4"
        key="right"
      >
        {/* <ThemeSwitcher /> */}

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
          <AddQuestionDialog addNewQuestion={addQuestion} />
          <Button variant={"secondary"} onClick={saveQuiz}>
            Zapisz
          </Button>
        </div>
        {/* <Settings size={30} /> */}
      </div>,
    ]);
  }, [addQuestion, saveQuiz, isNewQuiz, setNavbarComponents]);

  return null;
};

export default EditQuizNavbar;
