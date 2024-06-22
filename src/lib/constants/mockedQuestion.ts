// import { Question } from "@prisma/client";
// import { v4 as uuidv4 } from "uuid";
// export const mockedQuestion = (quizId: string): Question[] => {
//   const generateQuestion = (
//     title: string,
//     img: string,
//     type: string,
//     time: number,
//     points: number,
//     answers: { title: string; isCorrect: boolean; img: string | null }[],
//   ): Question => {
//     const questionId = uuidv4();
//     const currentTime = new Date();
//     return {
//       id: questionId,
//       title,
//       img,
//       color: null,
//       type,
//       time,
//       points,
//       quizId,
//       createdAt: currentTime,
//       updatedAt: currentTime,
//       answers: answers.map((answer) => ({
//         id: uuidv4(),
//         title: answer.title,
//         isCorrect: answer.isCorrect,
//         questionId,
//         img: answer.img,
//         createdAt: currentTime,
//         updatedAt: currentTime,
//       })),
//     };
//   };

//   return [
//     generateQuestion(
//       "Wybierz prawidłową odpowiedź",
//       "",
//       "multipleChoice",
//       120,
//       80,
//       [
//         {
//           title: "A",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "B",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "C",
//           isCorrect: true,
//           img: null,
//         },
//         {
//           title: "D",
//           isCorrect: false,
//           img: null,
//         },
//       ],
//     ),
//     generateQuestion(
//       "Wybierz prawidłową odpowiedź",
//       "",
//       "multipleChoice",
//       120,
//       80,
//       [
//         {
//           title: "FF",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "PP",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "FP",
//           isCorrect: true,
//           img: null,
//         },
//         {
//           title: "PF",
//           isCorrect: false,
//           img: null,
//         },
//       ],
//     ),
//     generateQuestion(
//       "Wybierz prawidłową odpowiedź",
//       "",
//       "multipleChoice",
//       120,
//       80,
//       [
//         {
//           title: "A",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "B",
//           isCorrect: true,
//           img: null,
//         },
//         {
//           title: "C",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "D",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "E",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "F",
//           isCorrect: false,
//           img: null,
//         },
//       ],
//     ),
//     generateQuestion(
//       "Wybierz prawidłową odpowiedź",
//       "",
//       "multipleChoice",
//       120,
//       80,
//       [
//         {
//           title: "PPP",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "FFF",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "PFP",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "FPF",
//           isCorrect: true,
//           img: null,
//         },
//         {
//           title: "FPP",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "PFF",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "FFP",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "PPF",
//           isCorrect: false,
//           img: null,
//         },
//       ],
//     ),
//     generateQuestion(
//       "Wybierz prawidłową odpowiedź",
//       "",
//       "multipleChoice",
//       120,
//       80,
//       [
//         {
//           title: "A",
//           isCorrect: true,
//           img: null,
//         },
//         {
//           title: "B",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "C",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "D",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "E",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "F",
//           isCorrect: false,
//           img: null,
//         },
//       ],
//     ),
//     generateQuestion(
//       "Wybierz prawidłową odpowiedź",
//       "",
//       "multipleChoice",
//       120,
//       80,
//       [
//         {
//           title: "A",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "B",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "C",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "D",
//           isCorrect: false,
//           img: null,
//         },
//         {
//           title: "E",
//           isCorrect: true,
//           img: null,
//         },
//         {
//           title: "F",
//           isCorrect: false,
//           img: null,
//         },
//       ],
//     ),
//   ];
// };

export const mockedQuestion = "";
