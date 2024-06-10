"use server";

import { Collection } from "@prisma/client";
import { db } from "../db";
import { revalidateTag } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { slugify } from "../utils";
// Upewnij się, że masz właściwą ścieżkę do instancji Prisma

export const addOrEditCollection = async (collection: Collection) => {
  try {
    const existingCollection = await db.collection.findUnique({
      where: { id: collection.id },
    });
    console.log(existingCollection);
    if (existingCollection) {
      // Jeśli kolekcja istnieje, aktualizujemy ją
      const updatedCollection = await db.collection.update({
        where: { id: collection.id },
        data: {
          title: collection.title,
          desc: collection.desc,
          img: collection.img,
          color: collection.color,
          isDefault: collection.isDefault,
          visibility: collection.visibility || "public",
          updatedAt: new Date(),
        },
      });

      console.log("existing");
    } else {
      // Jeśli kolekcja nie istnieje, dodajemy nową
      console.log("new");
      const newCollection = await db.collection.create({
        data: {
          id: uuidv4(),
          title: collection.title,
          desc: collection.desc,
          img: collection.img,
          color: collection.color,
          slug: slugify("kolekcja"),
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

    console.log(error);
    throw new Error("Failed to add or edit collection");
  }
};
