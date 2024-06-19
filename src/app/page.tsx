import { getNewestQuizes } from "@/lib/actions";

import { db } from "@/lib/db";

import QuizzesSlider from "@/components/layouts/sliders/QuizzesSlider";
import CollectionsSlider from "@/components/layouts/sliders/CollectionsSlider";

export default async function Home() {
  const quizzes = await db.quiz.findMany({
    take: 10,
    include: {
      questions: true,
      author: true,
    },
  });
  const newestQuizes = await getNewestQuizes(8);
  const collections = await db.collection.findMany();

  return (
    <>
      {/* <HomeNavbar /> */}
      <main className="flex flex-col gap-4 rounded-xl bg-card p-4">
        {/* <HomeQuizSectionLabel title={"Wybrane Quizy"} seeMoreLink="/quizzes" /> */}

        <QuizzesSlider
          quizzes={quizzes}
          title="Nowe Quizy"
          seeAllLink="/quizzes"
        />

        {/* <HomeQuizSectionLabel title={"Najnowsze Quizy"} /> */}

        <QuizzesSlider quizzes={newestQuizes} title="Nie działające Quizy" />

        {/* <HomeQuizSectionLabel title={"Kolekcje"} seeMoreLink="/collections" /> */}
        <CollectionsSlider
          collections={collections}
          title="Kolekcje"
          seeAllLink="/collections"
        />
      </main>
    </>
  );
}
