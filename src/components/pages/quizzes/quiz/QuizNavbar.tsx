"use client";
import { buttonVariants } from "@/components/ui/button";
import useNavbarStore from "@/lib/store/useNavbarStore";
import { cn } from "@/lib/utils";
import { Quiz } from "@prisma/client";
import { Pencil, Share, Star, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import QuizAddToFavorites from "./QuizAddToFavorites";

type QuizNavbarProps = {
  userId?: string;
  isInFavorites: boolean;
  slug: string;
  quizId: string;
};

const QuizNavbar = ({
  userId,
  quizId,
  isInFavorites,
  slug,
}: QuizNavbarProps) => {
  const setNavbarComponents = useNavbarStore(
    (state) => state.setNavbarComponents,
  );

  useEffect(() => {
    setNavbarComponents([
      <div key={"quiz-navbar"} className="flex items-center gap-4">
        <Link
          className={cn(buttonVariants(), "hidden md:flex")}
          href={`/game/${slug}`}
        >
          Graj
        </Link>
        <Link href={`/editQuiz/${slug}`}>
          <Pencil />
        </Link>
        {userId && (
          <QuizAddToFavorites
            isInFavorites={isInFavorites}
            userId={userId as string}
            quizId={quizId}
          />
        )}
        <Share />
      </div>,
    ]);
  }, [userId, quizId, isInFavorites, slug, setNavbarComponents]);

  // Return null or a placeholder if necessary
  return null;
};

export default QuizNavbar;
