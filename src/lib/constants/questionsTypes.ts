import { QuestionType } from "@prisma/client";
import {
  ArrowDown01,
  CopyCheck,
  FileQuestion,
  ListChecks,
  LucideProps,
  MessageCircleQuestion,
} from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";

type TQuestionsTypes = {
  title: string;
  value: QuestionType;
  icon: React.ComponentType<LucideProps>; // Użyj React.ComponentType jako typu dla komponentu
};

export const questionsTypes: TQuestionsTypes[] = [
  {
    title: "Wielokrotny wybór",
    value: "multipleChoice",
    icon: CopyCheck, // Ikona dla pytania wielokrotnego wyboru
  },
  {
    title: "Sortowalne",
    value: "sortable",
    icon: ListChecks, // Ikona dla pytania sortowalnego
  },
  {
    title: "Prawda/Fałsz",
    value: "trueOrFalse",
    icon: FaCircleCheck, // Ikona dla pytania typu prawda/fałsz
  },
  {
    title: "Otwarte",
    value: "openEnded",
    icon: MessageCircleQuestion, // Ikona dla pytania otwartego
  },
];
