"use client";

import React, { useEffect, useState } from "react";

import SliderQuiz from "./SliderQuiz";

import { ThreeDots } from "react-loader-spinner";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { QuizWithQuestions } from "@/types/extended";
import SliderLabel from "./SliderLabel";

type QuizzesSliderProps = {
  quizzes: QuizWithQuestions[];
  title: string;
  seeAllLink?: string;
};

const QuizzesSlider = ({ quizzes, title, seeAllLink }: QuizzesSliderProps) => {
  const [email, setEmail] = useState<string | undefined>();

  const animation = { duration: 20000, easing: (t: number) => t };
  const [loading, setLoading] = useState(true);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    drag: true,
    mode: "free",
    renderMode: "precision",

    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 4,
          spacing: 13,
        },
      },
    },
    slides: {
      perView: 2,
      spacing: 13,
    },

    // created(s) {
    //   s.moveToIdx(5, true, animation);
    // },
    // updated(s) {
    //   s.moveToIdx(s.track.details.abs + 5, true, animation);
    // },
    // animationEnded(s) {
    //   s.moveToIdx(s.track.details.abs + 5, true, animation);
    // },
  });

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  if (loading) {
    return (
      <div className="relative col-span-2 mx-2 flex h-[180px] w-full items-center justify-center sm:h-[240px] md:col-span-4 md:h-[200px] lg:h-[280px]">
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color="white"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <SliderLabel title={title} seeAllLink={seeAllLink} />
      <div ref={sliderRef} className="keen-slider">
        {/* <div className="absolute -left-2 top-0 z-20 h-full w-16 bg-gradient-to-r from-slate-950 to-black/0"></div> */}
        <div className="absolute -right-2 top-0 z-20 h-full w-20 bg-gradient-to-l from-background to-background/0"></div>

        {quizzes.map((quiz: QuizWithQuestions) => (
          <SliderQuiz quiz={quiz} email={email} key={quiz.slug} />
        ))}
      </div>
    </div>
  );
};

export default QuizzesSlider;
