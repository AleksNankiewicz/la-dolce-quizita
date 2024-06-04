import React from "react";
import Image from "next/image";
import { Pencil, Share } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import { questionsProps } from "@/types/data";

import { cn, sliceArrayByPercentage } from "@/lib/utils";

import { db } from "@/lib/db";
import QuestionBlock from "@/components/layouts/blocks/QuestionBlock";

import BottomNavbar from "@/components/layouts/BottomNavbar";
import Navbar from "@/components/layouts/Navbar";
import QuizAddToFavorite from "@/components/pages/quizzes/quiz/QuizAddToFavorites";
import { auth } from "@/auth";

const SingleQuizPage = async (params: any) => {
  const slug = params.params.slug;

  const session = await auth();

  const user = session?.user;

  // const quiz = await getQuizBySlug(slug)

  const favoriteQuizzes = await db.quiz.findMany({
    where: {
      favoritedBy: {
        some: {
          id: user?.id,
        },
      },
    },
  });

  console.log(favoriteQuizzes);
  const quiz = await db.quiz.findFirst({
    where: {
      slug: slug,
    },
    include: {
      questions: true,
    },
  });
  // console.log(quiz)

  // const quizDuration = {
  //   time: 0,
  //   minutes: 0,
  //   seconds: 0,
  // };
  // let quizMaxPoints = 0;
  // const slicedArr =
  //   quiz?.questions &&
  //   sliceArrayByPercentage(quiz.questions, quiz.questionsPercent);

  // if (slicedArr) {
  //   slicedArr.forEach((question: questionsProps) => {
  //     quizDuration.time += question.time;

  //     quizMaxPoints += question.points;
  //   });
  // }

  if (!quiz) return;

  return (
    <>
      <Navbar title="Quiz" exit>
        <div className="flex items-center gap-4">
          <Link
            className={cn(buttonVariants(), "hidden md:flex")}
            href={`/game/${slug}`}
          >
            Graj
          </Link>
          <Link href={`/editQuiz/${slug}`}>
            <Pencil />
          </Link>
          {user && (
            <QuizAddToFavorite
              isInFavorites={
                !favoriteQuizzes.some(
                  (favoriteQuiz) => favoriteQuiz.slug === slug,
                )
              }
              userId={user?.id as string}
              quizId={quiz.id}
            />
          )}
          <Share />
        </div>
      </Navbar>
      <main className="grid w-full grid-cols-2 gap-3 pb-[100px] md:pb-0">
        {quiz.img && (
          <div className="relative col-span-2 mx-auto flex h-full min-h-[200px] w-full justify-center overflow-hidden rounded-xl text-center text-2xl text-black">
            <Image
              src={quiz.img}
              fill
              alt="background"
              className="overflow-hidden rounded-2xl object-cover duration-300"
            />
          </div>
        )}
        <div className="col-span-2 pt-4">
          <h1 className="text-2xl font-semibold">{quiz.title}</h1>
        </div>

        {/* <div className=" text-sm border-y   col-span-2 w-full text-center  flex justify-evenly items-center divide-x py-3">
          <div className="flex flex-col  justify-between items-center gap-1 flex-1 py-1">
            <p className="text-xl font-semibold">
              {slicedArr && slicedArr.length}
            </p>
            <p>Pytania</p>
          </div>
          <div className="flex flex-col  justify-between items-center gap-1 flex-1 py-1">
            <p className="text-xl font-semibold">{quiz.level}</p>
            <p>Poziom</p>
          </div>
          <div className="flex flex-col  justify-between items-center gap-1 flex-1 py-1">
            <p className="text-xl font-semibold">{quizMaxPoints}</p>
            <p>Punktów</p>
          </div>
        </div> */}
        {/* <Separator /> */}
        {quiz.desc && (
          <div className="text-md col-span-2 flex flex-col gap-1 rounded-xl">
            <h1 className="py-3 text-lg font-semibold">Opis</h1>
            <p>{quiz.desc}</p>
          </div>
        )}

        {quiz.questions && (
          <div className="col-span-full">
            <div className="flex justify-between py-10">
              <h1 className="text-2xl font-semibold">
                Pytania ({quiz.questions.length})
              </h1>
              {/* <div className="flex gap-2 text-purple-500 text-xl font-semibold">
                <p className="md:hidden">Więcej</p>
                <p className="hidden md:block">Zobacz więcej</p>
                <ArrowRight />
              </div> */}
            </div>
            <div className="flex flex-col gap-5">
              {quiz.questions.map((question, index) => (
                <QuestionBlock
                  key={quiz.id}
                  question={question}
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        )}

        <BottomNavbar>
          <Link
            className={cn(buttonVariants({ size: "xl" }))}
            href={`/game/${slug}`}
          >
            Graj
          </Link>
        </BottomNavbar>
      </main>
    </>
  );
};

export default SingleQuizPage;
