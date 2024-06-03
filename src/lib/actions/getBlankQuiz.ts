"use server";
import { ExtendedQuiz } from "@/types/extended";
import { Quiz } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
export const getBlankQuiz = async () => {
  const randomSlug = Math.floor(Math.random() * 999923) + "";
  try {
    const blankQuiz: ExtendedQuiz = {
      id: uuidv4(),
      reward: "",
      title: "",
      desc: "",
      slug: randomSlug,
      img: "",
      authorId: "clwfcaw9q000022hhr1a11j7w",

      playCount: 0,

      createdAt: new Date(),
      access: "all",
      level: "easy",
      visibility: "public",

      updatedAt: new Date(),
      questionsPercent: 100,
      questions: [],
      records: [],
      collections: [],
      hiddenQuestions: false,
    };

    return blankQuiz;
  } catch (error) {}
};
