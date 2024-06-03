"use client";
import toggleQuizInFavorites from "@/lib/actions/toggleQuizInFavorites";
import { Star } from "lucide-react";
import { revalidateTag } from "next/cache";
import React, { useState } from "react";

const QuizAddToFavorites = ({
  userId,
  quizId,
  isInFavorites,
}: {
  userId: string;
  quizId: string;
  isInFavorites: boolean;
}) => {
  const [isFavorite, setIsFavorite] = useState(isInFavorites);

  const addToFavoriteHandler = async () => {
    const result = await toggleQuizInFavorites(quizId, userId);
    console.log(result);
    if (result.success) {
      setIsFavorite((prev) => !prev);
    }
    // revalidateTag("quizes");
  };

  return (
    <Star
      fill={isFavorite ? "black" : "white"}
      onClick={addToFavoriteHandler}
    />
  );
};

export default QuizAddToFavorites;
