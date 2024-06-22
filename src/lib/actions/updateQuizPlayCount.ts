"use server";

import { db } from "../db";

export const updateQuizPlayCount = async (id: string) => {
  try {
    await db.quiz.update({
      where: { id },
      data: {
        playCount: {
          increment: 1, // Increment the play count by 1
        },
      },
    });
    console.log(`Play count for quiz ${id} updated successfully.`);
  } catch (err) {
    console.error(`Error updating play count for quiz ${id}:`, err);
  }
};
