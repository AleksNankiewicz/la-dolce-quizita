"use server";

import { Collection } from "@prisma/client";
import { db } from "../db";
import { revalidateTag } from "next/cache";
// Upewnij się, że masz właściwą ścieżkę do instancji Prisma

export const addOrEditCollection = async (collection: Collection) => {
  try {
    const existingCollection = await db.collection.findUnique({
      where: { id: collection.id },
    });

    if (existingCollection) {
      // Jeśli kolekcja istnieje, aktualizujemy ją
      const updatedCollection = await db.collection.update({
        where: { id: collection.id },
        data: {
          title: collection.title,
          desc: collection.desc,
          img: collection.img,
          isDefault: collection.isDefault,
          visibility: collection.visibility || "public",
          updatedAt: new Date(),
        },
      });
    } else {
      // Jeśli kolekcja nie istnieje, dodajemy nową
      const newCollection = await db.collection.create({
        data: {
          id: collection.id,
          title: collection.title,
          desc: collection.desc,
          img: collection.img,
          slug: collection.slug,
          visibility: collection.visibility || "public",
          isDefault: collection.isDefault,
          author: {
            connect: {
              id: collection.authorId,
            },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
    revalidateTag("collections");
    revalidateTag("quizes");
  } catch (error) {
    console.error("Error adding or editing collection:", error);
    throw new Error("Failed to add or edit collection");
  }
};
