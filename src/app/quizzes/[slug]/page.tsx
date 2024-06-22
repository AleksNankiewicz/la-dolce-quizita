import React from "react";
import Image from "next/image";
import { Dot, Pencil, Share } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import { questionsProps } from "@/types/data";

import { cn, sliceArrayByPercentage } from "@/lib/utils";

import { db } from "@/lib/db";
import QuestionBlock from "@/components/layouts/blocks/QuestionBlock";

import BottomNavbar from "@/components/layouts/BottomNavbar";

import QuizAddToFavorite from "@/components/pages/quizzes/quiz/QuizAddToFavorites";
import { auth } from "@/auth";
import QuizNavbar from "@/components/pages/quizzes/quiz/QuizNavbar";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import QuizAddToFavorites from "@/components/pages/quizzes/quiz/QuizAddToFavorites";

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
      favoritedBy: true,
      playedBy: true,
      author: true,
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
      <QuizNavbar
        isInFavorites={favoriteQuizzes.some(
          (favoriteQuiz) => favoriteQuiz.slug === slug,
        )}
        isAuthor={quiz.author.id === user?.id}
        quizId={quiz.id}
        slug={quiz.slug}
        userId={user?.id}
      />

      <main className="flex flex-col gap-3 pb-[100px] md:flex-row md:pb-0">
        <div className="flex flex-1 flex-col gap-6">
          {quiz.img && (
            <div className="relative col-span-1 mx-auto flex aspect-video h-full w-full justify-center overflow-hidden rounded-xl text-center text-2xl text-black md:max-h-[220px]">
              <Image
                src={quiz.img}
                fill
                alt="background"
                className="overflow-hidden rounded-2xl object-cover duration-300"
              />
            </div>
          )}

          <h1 className="text-3xl font-semibold">{quiz.title}</h1>
          <div className="flex items-center gap-2">
            {quiz.author.image && (
              <Avatar className="h-7 w-7">
                <AvatarImage src={quiz.author.image} />
              </Avatar>
            )}
            <Link
              href={`/profiles/${quiz.author.slug}/quizzes`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "px-0 font-medium text-black dark:text-white",
              )}
            >
              {quiz.author.name}
            </Link>
          </div>
          {/* <QuizAddToFavorites
            isInFavorites={favoriteQuizzes.some(
              (favoriteQuiz) => favoriteQuiz.slug === slug,
            )}
            userId={user?.id as string}
            quizId={quiz.id}
      
          /> */}
          {/* <div className="flex gap-1 text-muted-foreground">
            <p>{quiz.playedBy.length} graczy</p>
            <Dot />
            <p>{quiz.favoritedBy.length} Polubień</p>
          </div> */}
          <Link
            className={cn(buttonVariants(), "hidden sm:flex")}
            href={`/game/${slug}`}
          >
            Graj
          </Link>
          {quiz.desc && (
            <div className="text-md col-span-2 flex flex-col gap-1 rounded-xl">
              <p>{quiz.desc}</p>
            </div>
          )}
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

        {quiz.questions && (
          <div className="flex flex-1 flex-col gap-5 md:flex-[2]">
            <div className="flex justify-between">
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

        <BottomNavbar className="sm:hidden">
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
