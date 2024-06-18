import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { Separator } from "../../ui/separator";
import { questionsTypes } from "@/lib/constants/questionsTypes";
import { QuestionType } from "@prisma/client";
import { useState } from "react";
import { answerButtonColors } from "@/lib/constants/answerButtonColors";
import { cn } from "@/lib/utils";
import { QuestionWithAnswers } from "@/types/extended";

type AddQuestionDialogProps = {
  addNewQuestion: (newQuestion: QuestionWithAnswers) => void;
  quizId: string;
  className?: string;
};

export function AddQuestionDialog({
  addNewQuestion,
  quizId,
  className,
}: AddQuestionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={cn(className)}>Dodaj pytanie</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-3xl sm:w-[50%]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Dodaj Pytanie
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="mt-2 grid grid-cols-2 items-center gap-4 sm:grid-cols-1">
          {questionsTypes.map((type, index) => (
            <div
              key={index}
              onClick={() => addQuestionHandler(type.value)}
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-secondary p-6"
            >
              <type.icon size={40} className={answerButtonColors[index].text} />
              <h1 className="text-center text-xl font-bold">{type.title}</h1>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
