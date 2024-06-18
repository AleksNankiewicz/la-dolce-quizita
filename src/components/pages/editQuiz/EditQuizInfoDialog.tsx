import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpDown, Menu, Settings } from "lucide-react";
import ContentEditable from "@/components/ui/ContentEditable";
import ImageInput from "@/components/layouts/inputs/ImageInput";
import UnderlineInput from "@/components/layouts/inputs/UnderlineInput";
import { ExtendedQuiz } from "@/types/extended";
import { Separator } from "@/components/ui/separator";
import { editQuizInfoData } from "@/lib/constants/editQuizInfoData";
import { getTitleFromValue } from "@/lib/utils";
import AddQuizToCollectionDialog from "./AddQuizToCollectionDialog";
import { Collection } from "@prisma/client";
import { GradientPicker } from "@/components/ui/GradientPicker";

type EditQuizInfoDialogProps = {
  quiz: ExtendedQuiz;
  allCollections: Collection[];

  setQuiz: (quiz: ExtendedQuiz) => void;
};
const EditQuizInfoDialog = ({
  quiz,
  setQuiz,
  allCollections,
}: EditQuizInfoDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="absolute left-[7.5vh] sm:left-[200px] lg:left-[225px]">
        <div className="flex items-center rounded-xl border p-1">
          <div className="line-clamp-1 max-w-[150px] px-4 text-xl font-semibold sm:max-w-[200px] md:max-w-[330px]">
            {quiz.title ? (
              <p>{quiz.title}</p>
            ) : (
              <p className="text-gray-400">Wpisz tytuł quizu...</p>
            )}
          </div>
          <Button variant={"outline"}>
            <Settings />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-screen w-[90%] overflow-y-auto sm:w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Informacje o quizie
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4 rounded-xl md:flex-row md:gap-8">
          <div className="flex flex-[2] flex-col gap-4">
            <UnderlineInput
              value={quiz.title}
              onBlur={(value) => setQuiz({ ...quiz, title: value })}
              title="Tytuł"
              placeholder="Tu wpisz tytuł quizu"
              className="rounded-xl border-primary p-4"
            />
            <UnderlineInput
              value={quiz.desc}
              onBlur={(value) => setQuiz({ ...quiz, desc: value })}
              placeholder="Tu wpisz opis quizu"
              title="Opis"
              className="h-[209px] overflow-y-auto rounded-xl border-primary p-4"
            />
          </div>
          <ImageInput
            image={quiz.img}
            onImageChange={(image) =>
              setQuiz({ ...quiz, img: image as unknown as string })
            }
            title="Zdjęcie główne"
            placeholder="Dodaj zdjęcie"
            className="aspect-auto rounded-xl dark:bg-transparent md:min-h-[200px]"
            containerClassName=" md:w-1/2 w-full aspect-auto"
          />
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <AddQuizToCollectionDialog
            setQuiz={setQuiz}
            allCollections={allCollections}
            quiz={quiz}
          />
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">Kolor</p>
              <GradientPicker
                background={quiz.color || ""}
                setBackground={(color) => {
                  setQuiz({
                    ...quiz,
                    color: color,
                  });
                }}
              />
            </div>
            {editQuizInfoData.map((info) => (
              <div key={info.value} className="w-fit">
                <p className="pb-2 text-xl font-semibold">{info.title}</p>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="w-full border-0 outline-none">
                      <p className="text-xl font-semibold text-purple-500">
                        {getTitleFromValue(
                          quiz[info.value as keyof ExtendedQuiz],
                          info.data,
                        )}
                      </p>
                    </MenubarTrigger>
                    <MenubarContent className="min-w-[172px] overflow-y-auto">
                      {info.data.map((data) => (
                        <MenubarItem
                          key={data.value}
                          className="text-xl"
                          onClick={() => {
                            setQuiz({
                              ...quiz,
                              [info.value as keyof ExtendedQuiz]: data.value,
                            });
                          }}
                        >
                          <p>{data.title}</p>
                        </MenubarItem>
                      ))}
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuizInfoDialog;
