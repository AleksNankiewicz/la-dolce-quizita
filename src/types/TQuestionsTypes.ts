export type TQuestionErrorTypes = "noTitle" | "noAnswers" | "noCorrectAnswer";

export type TQuestionError = {
  questionIndex: number;
  errorTypes: ("noTitle" | "noAnswers" | "noCorrectAnswer")[];
};
