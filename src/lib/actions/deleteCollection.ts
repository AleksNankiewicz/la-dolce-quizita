"use server";

import { revalidateTag } from "next/cache";
import { db } from "../db";

const deleteCollection = async (collectionId: string) => {
  try {
    // Find the collection to ensure it exists
    const collection = await db.collection.findUnique({
      where: { id: collectionId },
      include: {
        quizzes: true,
      },
    });

    if (!collection) {
      throw new Error("Collection not found");
    }

    // Remove the association between the collection and the quizzes
    for (const quiz of collection.quizzes) {
      await db.quiz.update({
        where: { id: quiz.id },
        data: {
          collections: {
            disconnect: { id: collectionId },
          },
        },
      });
    }

    // Delete the collection
    await db.collection.delete({
      where: { id: collectionId },
    });
    revalidateTag("collections");
    revalidateTag("quizes");
    return { success: true, message: "Collection deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting collection:", error);
    return { success: false, message: error.message };
  }
};

export default deleteCollection;
