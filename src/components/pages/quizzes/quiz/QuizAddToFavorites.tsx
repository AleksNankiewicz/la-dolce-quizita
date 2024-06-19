import { Button } from "@/components/ui/button";
import toggleQuizInFavorites from "@/lib/actions/toggleQuizInFavorites";
import { Star } from "lucide-react";
import { revalidateTag } from "next/cache";

import React, { useState } from "react";

const QuizAddToFavorites = async ({
  userId,
  quizId,
  isInFavorites,
}: {
  userId: string;
  quizId: string;
  isInFavorites: boolean;
}) => {
  const addToFavoriteHandler = async () => {
    // setIsFavorite((prev) => !prev);
    const result = await toggleQuizInFavorites(quizId, userId);
    console.log(result);

    // if (result.success) {
    //   setIsFavorite((prev) => !prev);
    // }
    // revalidateTag("quizes");
  };

  return (
    <form
      action={async () => {
        "use server";

        await toggleQuizInFavorites(quizId, userId);
        revalidateTag("quizzes");
        revalidateTag("favorites");
        console.log("jjj");
      }}
    >
      <Button type="submit" variant={"ghost"}>
        <Star
          className="cursor-pointer"
          fill={isInFavorites ? "black" : "white"}
          // onClick={addToFavoriteHandler}
        />
      </Button>
    </form>
  );
};

export default QuizAddToFavorites;
