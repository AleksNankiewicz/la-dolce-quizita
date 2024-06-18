"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button, buttonVariants } from "../../ui/button";

import { Separator } from "../../ui/separator";
import { cn } from "@/lib/utils";

import { TAnswerButtonColors } from "@/lib/constants/answerButtonColors";
import { Switch } from "../../ui/switch";
import { Plus } from "lucide-react";
import ContentEditable from "../../ui/ContentEditable";
import { QuestionType } from "@prisma/client";

type AddAnswerProps = {
  addAnswer: (title: string, isCorrect: boolean) => void;
  questionType: QuestionType;
  color: TAnswerButtonColors;
};
const AddAnswerDialog = ({
  addAnswer,
  color,
  questionType,
}: AddAnswerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const handleCheckChange = () => {
    isCorrect ? setIsCorrect(false) : setIsCorrect(true);
  };
  const handleTitleChange = (newTilte: string) => {
    setTitle(newTilte);
  };

  const saveChanges = () => {
    if (!title) {
      return setError(true);
    }
    setIsOpen(false);
    addAnswer(title, isCorrect);
    setTitle(""), setIsCorrect(false);
    setError(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants(),
          "col-span-2 min-h-[84px] w-full py-7 md:hidden",
        )}
      >
        <Plus />
      </DialogTrigger>
      <DialogContent className="w-[80%] min-w-[80%] rounded-3xl">
        <DialogHeader className="relative">
          <DialogTitle className="font-bold">Dodaj Odpowiedź</DialogTitle>
        </DialogHeader>
        <Separator />

        <ContentEditable
          onBlur={handleTitleChange}
          value={""}
          error={error}
          errorMessage="Odpowiedź nie może być pusta"
          className={cn(
            // buttonVariants(),
            `flex min-h-[84px] items-center rounded-md p-7 text-xl text-white shadow-[0px_5px_0px_0px_#00000024] sm:justify-center sm:text-center`,
            color.background,
            color.shadow,
          )}
        />
        {questionType == "multipleChoice" || questionType == "trueOrFalse" ? (
          <div className="flex justify-between gap-2">
            <p className="font-semibold">Poprawna Odpowiedź</p>
            <Switch
              checked={isCorrect}
              onCheckedChange={handleCheckChange}
              className="bg-blue-500"
            />
          </div>
        ) : null}
        <Separator />
        <DialogFooter>
          <Button onClick={saveChanges} className="w-full rounded-full">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAnswerDialog;
