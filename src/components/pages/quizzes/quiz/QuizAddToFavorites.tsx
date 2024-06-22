"use client";
import { Button } from "@/components/ui/button";
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
    setIsFavorite((prev) => !prev);
    const result = await toggleQuizInFavorites(quizId, userId);
    console.log(result);

    // if (result.success) {
    //   setIsFavorite((prev) => !prev);
    // }
  };

  return (
    <Star
      onClick={addToFavoriteHandler}
      className="cursor-pointer"
      fill={isFavorite ? "black" : "white"}
      // onClick={addToFavoriteHandler}
    />
  );
};

export default QuizAddToFavorites;
