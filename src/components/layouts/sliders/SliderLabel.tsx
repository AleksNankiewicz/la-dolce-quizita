import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type HomeQuizSectionLabelProps = {
  title: string;
  seeAllLink?: string;
};

const SliderLabel = ({ title, seeAllLink }: HomeQuizSectionLabelProps) => {
  return (
    <div className="flex w-full items-center justify-between pb-5">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {seeAllLink && (
        <Link
          href={seeAllLink}
          className="flex items-center gap-1 text-base font-medium"
        >
          <p className="md:hidden">Więcej</p>
          <p className="hidden md:block">Zobacz więcej</p>
          {/* <ArrowRight /> */}
        </Link>
      )}
    </div>
  );
};

export default SliderLabel;
