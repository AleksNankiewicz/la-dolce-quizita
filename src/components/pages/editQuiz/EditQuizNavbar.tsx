import Link from "next/link";
import React from "react";
import { Plus, Settings, X } from "lucide-react";

import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import Navbar from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import { QuestionType } from "@prisma/client";
import { AddQuestionDialog } from "./AddQuestionDialog";

type EditQuizNavbarProps = {
  addQuestion: (questionType: QuestionType) => void;
  saveQuiz: () => void;
  isNewQuiz: boolean;
};

const EditQuizNavbar = ({
  addQuestion,
  saveQuiz,
  isNewQuiz,
}: EditQuizNavbarProps) => {
  return (
    <Navbar>
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <X strokeWidth={3} />
        </Link>
        {isNewQuiz ? (
          <h1 className="text-2xl font-bold">Dodaj Quiz</h1>
        ) : (
          <h1 className="text-2xl font-bold">Edytuj Quiz</h1>
        )}
      </div>
      <div className="flex items-center gap-4">
        {/* <ThemeSwitcher /> */}
        <div className="hidden gap-4 md:flex">
          <AddQuestionDialog addNewQuestion={addQuestion} />
          <Button variant={"secondary"} onClick={saveQuiz}>
            Zapisz
          </Button>
        </div>
        {/* <Settings size={30} /> */}
      </div>
    </Navbar>
  );
};

export default EditQuizNavbar;
