"use server";

import { ExtendedQuiz } from "@/types/extended";
import { db } from "../db";
import { revalidateTag } from "next/cache";

export const addQuiz = async (quizData: ExtendedQuiz) => {
  try {
    // Retrieve the existing quiz along with its nested relations
    const existingQuiz = await db.quiz.findUnique({
      where: { id: quizData.id },
      include: {
        questions: { include: { answers: true } },
        records: true,
        collections: true,
      },
    });

    if (!existingQuiz) {
      // If the quiz doesn't exist, create a new one
      const newQuiz = await db.quiz.create({
        data: {
          id: quizData.id,
          reward: quizData.reward,
          title: quizData.title,
          desc: quizData.desc,
          slug: quizData.slug,
          img: quizData.img,
          authorId: quizData.authorId,
          playCount: quizData.playCount,
          level: quizData.level,
          questionsPercent: quizData.questionsPercent,
          visibility: quizData.visibility,
          access: quizData.access,
          hiddenQuestions: quizData.hiddenQuestions,
          createdAt: quizData.createdAt,
          updatedAt: quizData.updatedAt,

          collections: {
            connect: quizData.collections.map((collection) => ({
              id: collection.id,
            })),
          },
        },
      });

      // Create the questions and their respective answers
      for (const question of quizData.questions) {
        const createdQuestion = await db.question.create({
          data: {
            id: question.id,
            title: question.title,
            img: question.img,
            type: question.type,
            time: question.time,
            points: question.points,
            quizId: newQuiz.id,
          },
        });

        for (const answer of question.answers) {
          await db.answer.create({
            data: {
              id: answer.id,
              title: answer.title,
              isCorrect: answer.isCorrect,
              questionId: createdQuestion.id,
            },
          });
        }
      }

      revalidateTag("quizzes");
      revalidateTag("collections");
      return newQuiz;
    } else {
      // If the quiz exists, update it
      const updatedQuiz = await db.$transaction(async (prisma) => {
        // Delete answers that are not present in the new quiz data
        const allAnswerIds = quizData.questions.flatMap((q) =>
          q.answers.map((a) => a.id),
        );

        await prisma.answer.deleteMany({
          where: {
            question: {
              quizId: quizData.id,
            },
            NOT: {
              id: {
                in: allAnswerIds,
              },
            },
          },
        });

        // Delete questions that are not present in the new quiz data
        await prisma.question.deleteMany({
          where: {
            quizId: quizData.id,
            NOT: {
              id: {
                in: quizData.questions.map((q) => q.id),
              },
            },
          },
        });

        // Update the quiz
        const updated = await prisma.quiz.update({
          where: { id: quizData.id },
          data: {
            reward: quizData.reward,
            title: quizData.title,
            desc: quizData.desc,
            slug: quizData.slug,
            img: quizData.img,
            authorId: quizData.authorId,
            playCount: quizData.playCount,
            level: quizData.level,
            questionsPercent: quizData.questionsPercent,
            visibility: quizData.visibility,
            access: quizData.access,
            hiddenQuestions: quizData.hiddenQuestions,
            createdAt: quizData.createdAt,
            updatedAt: quizData.updatedAt,
            collections: {
              connect: quizData.collections.map((collection) => ({
                id: collection.id,
              })),
            },
          },
          include: {
            questions: { include: { answers: true } },
            records: true,
            collections: true,
          },
        });

        // Create or update questions and their respective answers
        for (const question of quizData.questions) {
          const updatedQuestion = await prisma.question.upsert({
            where: { id: question.id },
            create: {
              id: question.id,
              title: question.title,
              img: question.img,
              type: question.type,
              time: question.time,
              points: question.points,
              quizId: updated.id,
            },
            update: {
              title: question.title,
              img: question.img,
              type: question.type,
              time: question.time,
              points: question.points,
            },
          });

          for (const answer of question.answers) {
            await prisma.answer.upsert({
              where: { id: answer.id },
              create: {
                id: answer.id,
                title: answer.title,
                isCorrect: answer.isCorrect,
                questionId: updatedQuestion.id,
              },
              update: {
                title: answer.title,
                isCorrect: answer.isCorrect,
              },
            });
          }
        }

        // Create records
        await prisma.record.createMany({
          data: quizData.records.map((record) => ({
            id: record.id,
            email: record.email,
            score: record.score,
            quizId: updated.id,
          })),
        });

        return updated;
      });

      revalidateTag("quizzes");
      revalidateTag("collections");
      return updatedQuiz;
    }
  } catch (err: any) {
    console.error("Error:", err);
    throw new Error(err.message);
  }
};
