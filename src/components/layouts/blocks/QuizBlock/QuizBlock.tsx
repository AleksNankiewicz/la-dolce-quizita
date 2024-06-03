import { daysAgo } from "@/lib/utils";

import { Quiz } from "@prisma/client";
import { User, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

import Link from "next/link";

// interface QuizBlockProps extends Quiz {
//   questions: Question[];
// }

const QuizBlock = ({ quiz }: { quiz: Quiz }) => {
  return (
    <Link
      href={`/quizzes/${quiz.slug}`}
      className="flex min-h-[121px] overflow-hidden rounded-2xl border"
    >
      <div className="relative min-w-[35%]">
        {quiz.img ? (
          <Image
            alt={`zdjęcie quizu`}
            className="object-cover"
            src={quiz.img}
            fill
          />
        ) : null}
        {/* <div className="absolute right-3 bottom-3 bg-primary p-1 flex gap-2 items-center text-sm rounded-md">
          <p>{quiz.questions.length} ?</p>
        </div> */}
      </div>
      <div className="flex w-full flex-col gap-3 p-3">
        <h1 className="line-clamp-1 text-xl font-semibold">{quiz.title}</h1>

        <div className="flex text-sm">
          <p>{daysAgo(quiz.createdAt)}</p>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2 text-sm">
            {quiz.visibility === "public" ? (
              <>
                <Users size={17} />
                <p>Publiczny</p>
              </>
            ) : (
              <>
                <User size={17} />
                <p>Prywatny</p>
              </>
            )}
          </div>
          {/* <QuizBlockMenuBar id={quiz.id} slug={quiz.slug} /> */}
        </div>
      </div>
    </Link>
  );
};

export default QuizBlock;
