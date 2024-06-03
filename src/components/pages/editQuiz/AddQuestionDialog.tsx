import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyCheck } from "lucide-react";
import { Separator } from "../../ui/separator";
import { questionsTypes } from "@/lib/constants/questionsTypes";
import { QuestionType } from "@prisma/client";
import { useState } from "react";
import { answerButtonColors } from "@/lib/constants/answerButtonColors";
import { cn } from "@/lib/utils";
type AddQuestionDialogProps = {
  addNewQuestion: (questionType: QuestionType) => void;
  className?: string;
};
export function AddQuestionDialog({
  addNewQuestion,
  className,
}: AddQuestionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const addQuestionHandler = (questionType: QuestionType) => {
    addNewQuestion(questionType);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={cn(className)}>Dodaj pytanie</Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Dodaj Pytanie
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="mt-2 grid grid-cols-2 items-center gap-4">
          {questionsTypes.map((type, index) => (
            <div
              key={index}
              onClick={() => addQuestionHandler(type.value)}
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-secondary p-6"
            >
              {
                <type.icon
                  size={40}
                  className={answerButtonColors[index].text}
                />
              }
              <h1 className="text-center text-xl font-bold">{type.title}</h1>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
