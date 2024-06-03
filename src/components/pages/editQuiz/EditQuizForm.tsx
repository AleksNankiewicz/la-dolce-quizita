"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button, buttonVariants } from "@/components/ui/button";
import { deleteQuiz, getUserByEmail } from "@/lib/actions";

import EditableQuestion from "./EditableQuestion";
import { v4 as uuidv4 } from "uuid";
import {
  cn,
  getTitleFromValue,
  handleScrollToBottom,
  sliceArrayByPercentage,
} from "@/lib/utils";

import toast from "react-hot-toast";

import { AnimatePresence, motion } from "framer-motion";

import { addQuiz } from "@/lib/actions/addQuiz";
import { Question } from "@prisma/client";

// Dodajemy pola dla pytań i odpowiedzi do typu Quiz

import { Checkbox } from "../../ui/checkbox";
import { uploadImages } from "@/lib/actions/uploadImages";
import { usePathname } from "next/navigation";

import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { ExtendedQuiz, QuestionWithAnswers } from "@/types/extended";
import { AddQuestionDialog } from "./AddQuestionDialog";
import { editQuizAccordionData } from "@/lib/constants/editQuizAccordionData";
import EditQuizNavbar from "./EditQuizNavbar";
import UnderlineInput from "@/components/layouts/inputs/UnderlineInput";
import ImageInput from "@/components/layouts/inputs/ImageInput";

const EditQuizForm = ({ initialQuiz }: { initialQuiz: ExtendedQuiz }) => {
  const [fetchedUser, setFetchedUser] = useState<any>();
  const [quiz, setQuiz] = useState<ExtendedQuiz>(initialQuiz);
  const pathName = usePathname();

  //content
  const [questions, setQuestions] = useState<QuestionWithAnswers[]>(
    quiz.questions,
  );
  //refs

  const [editableQuestionsRef, setEditableQuestionsRef] = useState<
    Array<React.RefObject<HTMLDivElement>>
  >(questions.map(() => React.createRef<HTMLDivElement>()));

  const addNewQuestion = (type: Question["type"]) => {
    const newQuestion: QuestionWithAnswers = {
      id: uuidv4(),
      title: "",
      // correctAnswear: false,
      points: 20,
      answers: [],
      time: 20,
      img: "",
      type: type,
      quizId: quiz.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
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
    const updatedQuestions = questions.filter((question: any) => {
      if (question.id) {
        return question.id !== id;
      } else {
        return question.title !== id;
      }
    });

    setQuestions(updatedQuestions);
  };

  const handleDeleteQuiz = async () => {
    try {
      await deleteQuiz(quiz.id);

      toast.success("Quiz usunięty!", {
        duration: 3000,
      });
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const saveQuiz = async () => {
    toast.loading("Zapisywanie quizu...");

    let imageRefs: (string | File)[] = [];
    const formData = new FormData();
    formData.append("file", quiz.img as unknown as string);

    questions.forEach((question) => {
      formData.append("file", question.img);
    });

    try {
      imageRefs = await uploadImages(formData);

      questions.forEach((question, index) => {
        question.img = imageRefs[index + 1] as string;
      });
    } catch {
      console.log("err");
    }

    const randomSlug = Math.floor(Math.random() * 999923) + "";
    const savedQuiz: ExtendedQuiz & {
      createdAt: Date;
      updatedAt: Date;
      img: string;
    } = {
      id: quiz.id,
      reward: "",
      title: quiz.title,
      desc: quiz.desc,
      slug: quiz.slug || randomSlug,
      img: imageRefs[0] as string,
      authorId: quiz.authorId || "clwfcaw9q000022hhr1a11j7w",
      records: quiz.records || [],
      questions: questions,
      playCount: quiz.playCount || 0,
      level: quiz.level || "easy",
      collections: quiz.collections || [],
      questionsPercent:
        typeof quiz.questionsPercent === "number"
          ? quiz.questionsPercent
          : typeof quiz.questionsPercent === "string"
            ? parseFloat(quiz.questionsPercent)
            : 100,
      visibility: quiz.visibility || "public",
      access: quiz.access || "all",
      hiddenQuestions: quiz.hiddenQuestions || false,
      createdAt: quiz.createdAt || new Date(),
      updatedAt: new Date(),
    };

    try {
      const saved = await addQuiz(savedQuiz);

      toast.dismiss();
      toast("Quiz Zapisany!", {
        icon: "😊",
      });

      if (pathName.includes("newQuiz")) {
        setTimeout(() => {
          window.location.href = `/editQuiz/${saved.slug}`;
        }, 2000);
      }
    } catch (err: any) {
      toast.dismiss();
      toast("Nie udało się zapisać quizu!", {
        icon: "😢",
      });
      console.log(err);
      throw new Error(err);
    }

    // console.log(savedQuiz)
  };

  return (
    <>
      <EditQuizNavbar
        isNewQuiz={pathName.includes("newQuiz")}
        addQuestion={addNewQuestion}
        saveQuiz={saveQuiz}
      />
      <main className="flex w-full flex-col gap-3 py-4 pb-24">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <ImageInput
            image={quiz.img}
            onImageChange={(image) =>
              setQuiz({ ...quiz, img: image as unknown as string })
            }
            title="Zdjęcie główne"
            className="rounded-xl dark:bg-transparent"
            containerClassName="flex-[2] lg:flex-1 aspect-video  rounded-xl"
          />
          <div className="flex-[2] flex-col gap-4">
            <UnderlineInput
              value={quiz.title}
              onBlur={(value) => setQuiz({ ...quiz, title: value })}
              title="Tytuł"
              placeholder="Tu wpisz tytuł quizu"
              className=""
            />
            <UnderlineInput
              value={quiz.desc}
              onBlur={(value) => setQuiz({ ...quiz, desc: value })}
              placeholder="Tu wpisz opis quizu"
              title="Opis"
              className="h-[209px] overflow-y-auto rounded-xl border-primary p-4"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-end gap-4 md:flex-row md:gap-8">
          {editQuizAccordionData.map((accordion) => (
            <Accordion
              className=""
              key={accordion.value}
              type="single"
              collapsible
            >
              <h1 className="text-lg font-medium">{accordion.title}</h1>
              <AccordionItem value="item-1">
                <AccordionTrigger className="border-b-2 border-b-primary pb-2 text-xl font-semibold">
                  {getTitleFromValue(
                    quiz[accordion.value as keyof ExtendedQuiz],
                    accordion.data,
                  )}
                </AccordionTrigger>
                <AccordionContent className="flex items-center gap-2 py-6">
                  <RadioGroup
                    defaultValue={quiz[
                      accordion.value as keyof ExtendedQuiz
                    ]?.toString()}
                    value={quiz[
                      accordion.value as keyof ExtendedQuiz
                    ]?.toString()}
                    onValueChange={(value) => {
                      setQuiz({
                        ...quiz,
                        [accordion.value as keyof ExtendedQuiz]: value,
                      });
                    }}
                  >
                    {accordion.data.map((data) => (
                      <div
                        className="flex items-center space-x-3"
                        key={data.value}
                      >
                        <RadioGroupItem value={data.value} id="r1" />
                        <Label className="text-xl font-semibold" htmlFor="r1">
                          {data.title}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>

        <h1 className="text-xl font-semibold">
          Pytania (
          {sliceArrayByPercentage(questions, quiz.questionsPercent).length})
        </h1>

        <AnimatePresence>
          {questions.map((question: QuestionWithAnswers, index: number) => (
            <React.Fragment key={question.id}>
              {question.type === "multipleChoice" || !question.type ? (
                <EditableQuestion
                  question={question}
                  index={question.id}
                  key={question.id}
                  deleteQuestion={deleteQuestion}
                  editQuestion={editQuestion}
                />
              ) : null}
            </React.Fragment>
          ))}
        </AnimatePresence>

        <div className="fixed bottom-0 left-0 flex w-full gap-4 bg-background p-4 md:hidden">
          <Button
            onClick={saveQuiz}
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
          />
        </div>
      </main>
    </>
  );
};

export default EditQuizForm;

// const addNewOpenQuestion = () => {
//   const newQuestion: quizProps['questions'][0] = {
//     id: uuidv4(),
//     title: 'Pytanie',
//     // correctAnswear: false,
//     points: 20,
//     answears: [],
//     time: 20,
//     img: '',
//     type: 'open-ended',
//     // quizId: quiz.id,
//     // createdAt: quiz.createdAt || new Date(),
//     updatedAt: new Date(),
//   }

//   setQuestions([...questions, newQuestion])
// }

// const addNewSortableQuestion = () => {
//   const newQuestion: quizProps['questions'][0] = {
//     id: uuidv4(),
//     title: 'Pytanie',
//     // correctAnswear: false,
//     points: 20,
//     answears: [],
//     time: 20,
//     img: '',
//     type: 'sortable',
//     // quizId: quiz.id,
//     // createdAt: quiz.createdAt || new Date(),
//     updatedAt: new Date(),
//   }

//   setQuestions([...questions, newQuestion])
// }

{
  /* {question.type === 'sortable' && (
            <EditableSortableQuestion
              question={question}
              refId={index}
              index={question.id}
              reference={editableQuestionsRef}
              key={question.id}
              onDelete={deleteQuestion}
              onInput={updateQuizOnInput}
            />
          )} */
}
{
  /* {question.type === 'open-ended' && (
            <EditableOpenQuestion
              question={question}
              refId={index}
              index={question.id}
              reference={editableQuestionsRef}
              key={question.id}
              onDelete={deleteQuestion}
              onInput={updateQuizOnInput}
            />
          )} */
}

{
  /* <motion.div
        initial={{
          height: isQuestionModalOpen ? 0 : 100,
          scale: isQuestionModalOpen ? 0 : 1,
          opacity: isQuestionModalOpen ? 0 : 1,
        }}
        animate={{
          height: isQuestionModalOpen ? 100 : 0,
          scale: isQuestionModalOpen ? 1 : 0,
          opacity: isQuestionModalOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        exit={{ height: 60, opacity: 0 }}
        className="w-full col-span-2 flex flex-col   gap-1 justify-center items-center my-2"
      >
        <Button
          variant={'secondary'}
          className="w-full bg-white  text-2xl flex justify-start gap-2"
          onClick={() => {
            addNewQuestion()
            setIsQuestionModalOpen(false)
            handleScrollToBottom()
          }}
        >
          <CopyCheck />
          Wielokrotnego Wyboru
        </Button>
        <Button
          variant={'secondary'}
          className="w-full bg-white  text-2xl gap-2 flex justify-start"
          onClick={() => {
            addNewOpenQuestion()
            setIsQuestionModalOpen(false)
            handleScrollToBottom()
          }}
        >
          <ClipboardPenLine />
          Otwarte
        </Button>
        <Button
          variant={'secondary'}
          className="w-full bg-white  gap-2 text-2xl flex justify-start"

          onClick={() => {
            addNewSortableQuestion()
            setIsQuestionModalOpen(false)
            handleScrollToBottom()
          }}
        >
          <ListCollapse />
          Sortowalne
        </Button>
      </motion.div> */
}
