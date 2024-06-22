"use server";
import { ExtendedQuiz } from "@/types/extended";

import { v4 as uuidv4 } from "uuid";
import { slugify } from "../utils";
export const getBlankQuiz = async (userId: string) => {
  const randomSlug = slugify("quiz");
  try {
    const blankQuiz: ExtendedQuiz = {
      id: uuidv4(),
      reward: "",
      title: "",
      desc: "",
      slug: randomSlug,
      img: "",
      authorId: userId,
      color: "",
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

// "use server";
// import { ExtendedQuiz } from "@/types/extended";

// import { v4 as uuidv4 } from "uuid";
// import { slugify } from "../utils";
// export const getBlankQuiz = async (userId: string) => {
//   const randomSlug = slugify("quiz");
//   try {
//     const blankQuiz: ExtendedQuiz = {
//       id: uuidv4(),
//       reward: "",
//       title: "",
//       desc: "",
//       slug: randomSlug,
//       img: "",
//       authorId: userId,
//       color: "",
//       playCount: 0,

//       createdAt: new Date(),
//       access: "all",
//       level: "easy",
//       visibility: "public",

//       updatedAt: new Date(),
//       questionsPercent: 100,
//       questions: [],
//       records: [],
//       collections: [],
//       hiddenQuestions: false,
//     };

//     return blankQuiz;
//   } catch (error) {}
// };
