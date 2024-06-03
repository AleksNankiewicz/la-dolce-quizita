import { QuizAccess, QuizLevel, QuizVisibility } from "@prisma/client";

export const editQuizAccordionData: TEditQuizAccordionData[] = [
  {
    title: "Wybierz Ilość Pytań",
    value: "questionsPercent",
    data: [
      {
        title: "25%",
        value: "25",
      },
      {
        title: "50%",
        value: "50",
      },
      {
        title: "75%",
        value: "75",
      },
      {
        title: "100%",
        value: "100",
      },
    ],
  },
  {
    title: "Widoczność",
    value: "visibility",
    data: [
      {
        title: "Prywatny",
        value: QuizVisibility.private,
      },
      {
        title: "Publiczny",
        value: QuizVisibility.public,
      },
    ],
  },
  // {
  //   title: 'Dostępność',
  //   value: 'access',
  //   data: [
  //     {
  //       title: 'Wszyscy',
  //       value: QuizAccess.all,
  //     },
  //     {
  //       title: 'Tylko zalogowani',
  //       value: QuizAccess.authorizedOnly,
  //     },
  //   ],
  // },
  // {
  //   title: 'Poziom',
  //   value: 'level',
  //   data: [
  //     {
  //       title: 'Łatwy',
  //       value: QuizLevel.easy,
  //     },
  //     {
  //       title: 'Średni',
  //       value: QuizLevel.medium,
  //     },
  //     {
  //       title: 'Trudny',
  //       value: QuizLevel.hard,
  //     },
  //     {
  //       title: 'Expert',
  //       value: QuizLevel.expert,
  //     },
  //   ],
  // },
] as const;

type TEditQuizAccordionDataArr = {
  title: string;
  value: string;
};

type TEditQuizAccordionData = {
  title: string;
  value: string;
  data: TEditQuizAccordionDataArr[];
};
