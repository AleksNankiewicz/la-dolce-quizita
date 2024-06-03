"use server";

import { revalidateTag } from "next/cache";
import { db } from "../db";

const toggleQuizInFavorites = async (quizId: string, userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { favoriteQuizzes: true }, // Include favorite quizzes to check if the quiz is already favorited
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isQuizFavorited = user.favoriteQuizzes.some(
      (favorite) => favorite.id === quizId,
    );

    if (isQuizFavorited) {
      // Quiz is already favorited, so remove it
      await db.user.update({
        where: { id: userId },
        data: {
          favoriteQuizzes: {
            disconnect: { id: quizId },
          },
        },
      });
    } else {
      // Quiz is not favorited, so add it
      await db.user.update({
        where: { id: userId },
        data: {
          favoriteQuizzes: {
            connect: { id: quizId },
          },
        },
      });
    }
    revalidateTag("quizes");
    return { success: true };
  } catch (error) {
    console.error("Error toggling quiz in favorites:", error);
    throw new Error("Failed to toggle quiz in favorites");
  }
};

export default toggleQuizInFavorites;
