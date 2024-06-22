import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Collection } from "@prisma/client";
import CollectionBlock from "@/components/layouts/blocks/CollectionBlock";
import { ExtendedQuiz } from "@/types/extended";

type AddQuizToCollectionDialogProps = {
  allCollections: Collection[];
  quiz: ExtendedQuiz;
  setQuiz: (quiz: ExtendedQuiz) => void;
};

const AddQuizToCollectionDialog = ({
  allCollections,
  quiz,
  setQuiz,
}: AddQuizToCollectionDialogProps) => {
  const handleCollectionToggle = (collection: Collection) => {
    const isAlreadyAdded = quiz.collections.some(
      (col) => col.id === collection.id,
    );

    const newCollections = isAlreadyAdded
      ? quiz.collections.filter((col) => col.id !== collection.id)
      : quiz.collections.length < 3
        ? [...quiz.collections, collection]
        : quiz.collections;

    setQuiz({
      ...quiz,
      collections: newCollections,
    });
  };

  const getButtonText = (quizCollections: Collection[]) => {
    if (quizCollections.length === 0) {
      return "Wybierz Kolekcje";
    } else {
      return quizCollections.map((col) => col.title).join(", ");
    }
  };

  return (
    <Dialog>
      <div className="flex flex-col gap-1">
        <p className="text-xl font-semibold">Kolekcje</p>
        <DialogTrigger
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-auto whitespace-break-spaces text-xl",
          )}
        >
          {getButtonText(quiz.collections)}
        </DialogTrigger>
      </div>
      <DialogContent className="w-[80%] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-bold">Kolekcje</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {allCollections.map((collection) => (
            <div
              className="group relative cursor-pointer overflow-hidden rounded-xl"
              key={collection.id}
              onClick={() => handleCollectionToggle(collection)}
            >
              <CollectionBlock
                collection={collection}
                className="pointer-events-none text-base"
              />

              {!quiz.collections.some((col) => col.id === collection.id) && (
                <div className="absolute inset-0 hidden items-center justify-center bg-black bg-opacity-50 font-semibold text-white sm:group-hover:flex">
                  Wybierz kolekcje
                </div>
              )}
              {quiz.collections.some((col) => col.id === collection.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 font-semibold text-white">
                  Wybrana
                </div>
              )}
            </div>
          ))}
        </div>
        <DialogFooter className="mt-4 flex flex-row-reverse sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="default">
              OK
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuizToCollectionDialog;
