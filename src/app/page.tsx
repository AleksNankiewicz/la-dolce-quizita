import { db } from "@/lib/db";

import QuizzesSlider from "@/components/layouts/sliders/QuizzesSlider";
import CollectionsSlider from "@/components/layouts/sliders/CollectionsSlider";

export default async function Home() {
  const newestQuizes = await db.quiz.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      questions: true,
      author: true,
    },
  });

  const mostPlayedQuizes = await db.quiz.findMany({
    take: 10,
    orderBy: {
      playCount: "desc",
    },
    include: {
      questions: true,
      author: true,
    },
  });

  const animalsQuizzes = await db.quiz.findMany({
    include: { collections: true, questions: true, author: true },
    where: {
      collections: {
        some: {
          title: "Zwierzęta",
        },
      },
    },
  });
  const foodQuizzes = await db.quiz.findMany({
    include: { collections: true, questions: true, author: true },
    where: {
      collections: {
        some: {
          title: "Jedzenie",
        },
      },
    },
  });

  const collections = await db.collection.findMany({
    take: 10,
  });

  return (
    <>
      <main className="flex flex-col gap-4 rounded-xl bg-card p-4">
        <QuizzesSlider
          quizzes={newestQuizes}
          title="Nowe Quizy"
          seeAllLink="/quizzes"
        />

        <CollectionsSlider
          collections={collections}
          title="Kolekcje"
          seeAllLink="/collections"
        />
        <QuizzesSlider
          quizzes={mostPlayedQuizes}
          title="Popularne Quizy"
          seeAllLink="/quizzes"
        />
        <QuizzesSlider
          quizzes={animalsQuizzes}
          title="Quizy ze zwierzętami"
          seeAllLink="/quizzes"
        />
        <QuizzesSlider
          quizzes={foodQuizzes}
          title="Quizy o jedzeniu"
          seeAllLink="/quizzes"
        />
      </main>
    </>
  );
}
