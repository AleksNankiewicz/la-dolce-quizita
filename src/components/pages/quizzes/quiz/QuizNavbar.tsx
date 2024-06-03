import Navbar from "@/components/layouts/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Quiz } from "@prisma/client";
import { Pencil, Share, Star, X } from "lucide-react";
import Link from "next/link";
import React from "react";

type QuizNavbarProps = {
  slug: string;
  id: string;
};

const QuizNavbar = ({ slug, id }: QuizNavbarProps) => {
  return (
    <Navbar title="Quiz" exit>
      <div className="flex items-center gap-4">
        <Link
          className={cn(buttonVariants(), "hidden md:flex")}
          href={`/game/${slug}`}
        >
          Graj
        </Link>
        <Link href={`/editQuiz/${slug}`}>
          <Pencil />
        </Link>

        <Star />
        <Share />
      </div>
    </Navbar>
  );
};

export default QuizNavbar;
