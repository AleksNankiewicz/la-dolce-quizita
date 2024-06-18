"use server";
import { db } from "../db";

export async function searchQuizOrCollection(query: string) {
  if (!query) {
    return { quizzes: [], collections: [] };
  }

  try {
    const quizzes = await db.quiz.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    const collections = await db.collection.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return { quizzes, collections };
  } catch (error) {
    console.error("Error fetching search results:", error);
    return { quizzes: [], collections: [] };
  }
}
