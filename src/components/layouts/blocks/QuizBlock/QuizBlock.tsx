"use client";
import {
  cn,
  daysAgo,
  getQuestionLabel,
  getTextColorForBackground,
} from "@/lib/utils";

import { Question, Quiz } from "@prisma/client";
import { User, Users } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  QuizWithQuestions,
  QuizWithQuestionsAndAuthor,
} from "@/types/extended";
import Link from "next/link";

interface QuizBlockProps {
  quiz: QuizWithQuestionsAndAuthor;
  className?: string;
}

const QuizBlock = ({ quiz, className }: QuizBlockProps) => {
  return (
    <Link
      href={`/quizzes/${quiz.slug}`}
      className={cn(
        "flex h-[250px] flex-col overflow-hidden rounded-2xl border",
        className,
      )}
      style={
        quiz.color
          ? {
              backgroundColor: quiz.color,
              color: getTextColorForBackground(quiz.color),
            }
          : {}
      }
    >
      <div className="relative flex-1">
        {quiz.img ? (
          <Image
            alt={`zdjęcie quizu`}
            className="object-cover"
            src={quiz.img}
            fill
          />
        ) : null}
        <div
          className="absolute bottom-2 right-2 flex items-center gap-2 rounded-md bg-primary px-2 py-1 text-xs text-white"
          style={
            quiz.color
              ? {
                  backgroundColor: quiz.color,
                  color: getTextColorForBackground(quiz.color),
                }
              : {}
          }
        >
          <p>{getQuestionLabel(quiz.questions.length)}</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 p-3">
        <h1 className="line-clamp-2 text-xl font-semibold">{quiz.title}</h1>

        {/* <div className="flex text-sm">
          <p>{daysAgo(quiz.createdAt)}</p>
        </div> */}
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2 text-sm">
            {/* {quiz.visibility === "public" ? (
              <>
                <Users size={17} />
                <p>Publiczny</p>
              </>
            ) : (
              <>
                <User size={17} />
                <p>Prywatny</p>
              </>
            )} */}

            {quiz.author.name && <p>{quiz.author.name}</p>}
          </div>
          {/* <QuizBlockMenuBar id={quiz.id} slug={quiz.slug} /> */}
        </div>
      </div>
    </Link>
  );
};

export default QuizBlock;
