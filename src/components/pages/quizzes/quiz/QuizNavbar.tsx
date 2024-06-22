"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import useNavbarStore from "@/lib/store/useNavbarStore";
import { cn } from "@/lib/utils";

import { Pencil } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import QuizAddToFavorites from "./QuizAddToFavorites";

type QuizNavbarProps = {
  userId?: string;
  isAuthor: boolean;
  isInFavorites: boolean;
  slug: string;
  quizId: string;
};

const QuizNavbar = ({
  userId,
  quizId,
  isAuthor,
  isInFavorites,
  slug,
}: QuizNavbarProps) => {
  const setNavbarComponents = useNavbarStore(
    (state) => state.setNavbarComponents,
  );

  useEffect(() => {
    setNavbarComponents([
      <div key={"quiz-navbar"} className="flex items-center gap-4">
        {isAuthor && (
          <Link href={`/editQuiz/${slug}`}>
            <Pencil className="sm:hidden" />
            <Button className="hidden sm:block" variant={"secondary"}>
              Edytuj
            </Button>
          </Link>
        )}

        {userId && (
          <QuizAddToFavorites
            isInFavorites={isInFavorites}
            userId={userId as string}
            quizId={quizId}
          />
        )}
        {/* <Share /> */}
      </div>,
    ]);
  }, [userId, quizId, isInFavorites, slug, setNavbarComponents]);

  // Return null or a placeholder if necessary
  return null;
};

export default QuizNavbar;
