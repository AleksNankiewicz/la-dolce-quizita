import { Coins, Lightbulb, Pen, Plus, Timer, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";

import { answearProps, questionsProps } from "@/types/data";
import { Button } from "../ui/button";
import { number } from "zod";
import { Input } from "../ui/input";
import { disableTextInInput } from "@/lib/utils";
import EditableOpenAnswear from "./EditableOpenAnswear";

const EditableOpenQuestion = ({
  question,
  index,
  reference,
  onDelete,
  onInput,
  refId,
}: {
  question: questionsProps;
  index: string;
  reference: React.RefObject<HTMLDivElement>[];
  refId: number;
  onDelete: (index: string, refId: number, questionPoints: number) => void;
  onInput: (index: number, time: number, points: number) => void;
}) => {
  const ref = reference[refId];
  console.log(question);
  const [answears, setAnswears] = useState<answearProps[]>(question.answears);

  const [image, setImage] = useState<string | null>(question.img);

  const [questionPoints, setQuestionPoints] = useState(question.points);
  const [questionTime, setQuestionTime] = useState(question.time);

  const showImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const addNewAnswear = () => {
    const newAnswear = {
      title: "Odpowiedź",
      isCorrect: true,
      id: "",
    };
    setAnswears([...answears, newAnswear]);
  };

  return (
    <div
      key={index}
      ref={ref}
      id={index}
      className={`relative col-span-2 flex w-full flex-col items-center justify-evenly gap-3 rounded-xl border-2 bg-slate-950 p-4 text-center`}
    >
      <Button
        className="absolute right-0 top-0 bg-transparent text-red-500 hover:bg-transparent hover:text-red-400"
        onClick={() => onDelete(index, refId, questionPoints)}
      >
        <X />
      </Button>
      <div className="flex">
        <div className="flex flex-col items-center justify-center px-8">
          <Timer />

          <div className="flex items-center">
            <p
              id="editableQuestionTime"
              contentEditable
              suppressContentEditableWarning={true}
              className="ml-2 max-w-14"
              onInput={(e) => {
                disableTextInInput(e);
                const newTime = parseInt(e.currentTarget.innerText);
                setQuestionTime(newTime);
                onInput(refId, newTime, questionPoints);
              }}
            >
              {question.time}
            </p>
            s
          </div>
        </div>
        <div className="relative">
          {image && image !== "undefined" ? (
            <Image
              alt="quizphoto"
              src={image}
              width={100}
              height={100}
              className=""
            />
          ) : (
            <div className="col-span-2 w-full border bg-slate-950 p-8">
              <p>Zdjęcie</p>
            </div>
          )}
          <div className="absolute right-0 top-0 flex bg-red-500 p-1">
            <Input
              type="file"
              name={`file-${index}`}
              id={`imgInput${index}`}
              className="hidden"
              onChange={(e) => showImage(e)}
            />
            <label htmlFor={`imgInput${index}`} className="cursor-pointer">
              <Pen size={20} />{" "}
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-8">
          <Coins />
          <p
            id="editableQuestionPoints"
            contentEditable
            suppressContentEditableWarning={true}
            className="max-w-14"
            onInput={(e) => {
              disableTextInInput(e);
              const newPoints = parseInt(e.currentTarget.innerText);
              setQuestionPoints(newPoints);
              onInput(refId, questionTime, newPoints);
            }}
          >
            {question.points}
          </p>
        </div>
      </div>
      <p
        className="max-w-full break-words text-xl"
        id="editableQuestionTitle"
        contentEditable
        suppressContentEditableWarning={true}
      >
        {question.title}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {answears.map((answear: any, index: number) => (
          <EditableOpenAnswear answear={answear} key={index} />
        ))}
      </div>
      <Button
        className="relative col-span-2 w-full border bg-slate-950 py-8 hover:bg-slate-800"
        onClick={() => {
          addNewAnswear();
        }}
      >
        <Plus className="absolute left-1/2 top-1/2" />
        <Lightbulb />
      </Button>
    </div>
  );
};

export default EditableOpenQuestion;
