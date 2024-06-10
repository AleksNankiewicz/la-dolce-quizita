"use server";

import { db } from "../db";

export const getCollections = async () => {
  const collections = await db.collection.findMany();

  return collections;
};
