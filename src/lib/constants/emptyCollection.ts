import { Collection } from "@prisma/client";
import { slugify } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
export const emptyCollection: Collection = {
  id: uuidv4(),
  authorId: "",
  img: "",
  title: "",
  desc: "",
  isDefault: false,
  slug: slugify("kolekcja"),
  createdAt: new Date(),
  updatedAt: new Date(),
  visibility: "public",
};
