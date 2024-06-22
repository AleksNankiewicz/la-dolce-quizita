import { ExtendedQuiz, QuestionWithAnswers } from "@/types/extended";

import { TQuestionError } from "@/types/TQuestionsTypes";
import { addQuiz } from "../actions/addQuiz";
import { uploadImages } from "../actions/uploadImages";

type SaveQuizProps = {
  quiz: ExtendedQuiz;
  userId: string;
  pathName: string;
  questions: QuestionWithAnswers[];
  editableQuestionsRef: React.RefObject<HTMLDivElement>[];
  setErrorQuestions: React.Dispatch<React.SetStateAction<TQuestionError[]>>;
};

export const saveQuiz = async ({
  quiz,
  userId,
  pathName,
  questions,
  editableQuestionsRef,
  setErrorQuestions,
}: SaveQuizProps) => {
  const validateQuestions = (): TQuestionError[] => {
    return questions.reduce((errors, question, index) => {
      const errorTypes: TQuestionError["errorTypes"] = [];

      if (!question.title) {
        errorTypes.push("noTitle");
      }
      if (question.answers.length === 0) {
        errorTypes.push("noAnswers");
      }
      if (
        question.answers.length > 0 &&
        !question.answers.some((answer) => answer.isCorrect)
      ) {
        errorTypes.push("noCorrectAnswer");
      }

      if (errorTypes.length > 0) {
        errors.push({ questionIndex: index, errorTypes });
      }

      return errors;
    }, [] as TQuestionError[]);
  };

  const errors = validateQuestions();
  if (errors.length > 0) {
    setErrorQuestions(errors);
    const firstErrorQuestionIndex = errors[0].questionIndex;
    const firstErrorQuestionRef =
      editableQuestionsRef[firstErrorQuestionIndex]?.current;
    if (firstErrorQuestionRef) {
      firstErrorQuestionRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    return;
  }

  setErrorQuestions([]);

  let imageRefs: (string | File)[] = [];
  const formData = new FormData();
  formData.append("file", quiz.img as unknown as string);

  questions.forEach((question) => {
    formData.append("file", question.img);
  });

  try {
    imageRefs = await uploadImages(formData);

    questions.forEach((question, index) => {
      question.img = imageRefs[index + 1] as string;
    });
  } catch {
    console.log("err");
  }

  const randomSlug = Math.floor(Math.random() * 999923) + "";
  const savedQuiz: ExtendedQuiz & {
    createdAt: Date;
    updatedAt: Date;
    img: string;
  } = {
    id: quiz.id,
    reward: "",
    color: quiz.color || "",
    title: quiz.title,
    desc: quiz.desc,
    slug: quiz.slug || randomSlug,
    img: imageRefs[0] as string,
    authorId: quiz.authorId || userId,
    records: quiz.records || [],
    questions: questions,
    playCount: quiz.playCount || 0,
    level: quiz.level || "easy",
    collections: quiz.collections || [],
    questionsPercent:
      typeof quiz.questionsPercent === "number"
        ? quiz.questionsPercent
        : typeof quiz.questionsPercent === "string"
          ? parseFloat(quiz.questionsPercent)
          : 100,
    visibility: quiz.visibility || "public",
    access: quiz.access || "all",
    hiddenQuestions: quiz.hiddenQuestions || false,
    createdAt: quiz.createdAt || new Date(),
    updatedAt: new Date(),
  };

  try {
    const saved = await addQuiz(savedQuiz);

    if (pathName.includes("newQuiz")) {
      setTimeout(() => {
        window.location.href = `/editQuiz/${saved.slug}`;
      }, 2000);
    }
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
