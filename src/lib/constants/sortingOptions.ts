export const sortingOptions = {
  newest: {
    value: "newest" as const,
    title: "Najnowsze",
    orderBy: {
      createdAt: "desc" as const,
    },
  },
  oldest: {
    value: "oldest" as const,
    title: "Najstarsze",
    orderBy: {
      createdAt: "asc" as const,
    },
  },
  mostPopular: {
    value: "mostPopular" as const,
    title: "Popularne",
    orderBy: {
      playCount: "desc" as const,
    },
  },
};

export type TSortingOption = keyof typeof sortingOptions;
